import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const localDataFilePath = path.join(process.cwd(), 'data', 'enquiries.json');
const serverlessDataFilePath = '/tmp/warriorfitflow-enquiries.json';

const getWebhookConfig = () => {
  const candidates = [
    ['enquiry_webhook', process.env.enquiry_webhook],
    ['ENQUIRY_WEBHOOK', process.env.ENQUIRY_WEBHOOK],
    ['inquiry_webhook', process.env.inquiry_webhook],
    ['INQUIRY_WEBHOOK', process.env.INQUIRY_WEBHOOK]
  ];

  const active = candidates.find(([, value]) => Boolean(value?.trim()));

  return {
    url: active?.[1]?.trim() || '',
    source: active?.[0] || null
  };
};

const getDataFilePath = () => {
  // On Vercel/Serverless files under the project root are read-only at runtime.
  // Use /tmp for writable ephemeral storage to prevent runtime write failures.
  return process.env.VERCEL ? serverlessDataFilePath : localDataFilePath;
};

const validatePayload = (payload) => {
  if (!payload || typeof payload !== 'object') return false;
  const { name, phone, skill, location } = payload;
  const validSkill = ['Calisthenics', 'MMA', 'Both'].includes(skill);
  const validLocation = ['Location 1', 'Location 2', 'Location 3'].includes(location);

  return (
    Boolean(name?.trim()) &&
    /^\d{10,15}$/.test(String(phone).trim()) &&
    validSkill &&
    validLocation
  );
};

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!validatePayload(payload)) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const dataFilePath = getDataFilePath();
    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

    let existing = [];
    try {
      const file = await fs.readFile(dataFilePath, 'utf-8');
      existing = JSON.parse(file);
      if (!Array.isArray(existing)) existing = [];
    } catch {
      existing = [];
    }

    const entry = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString()
    };

    const { url: webhookUrl, source: webhookSource } = getWebhookConfig();
    let webhookDelivered = false;

    if (webhookUrl) {
      try {
        const webhookResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(entry)
        });
        webhookDelivered = webhookResponse.ok;
      } catch {
        webhookDelivered = false;
      }
    }

    existing.push(entry);
    await fs.writeFile(dataFilePath, JSON.stringify(existing, null, 2), 'utf-8');

    return Response.json(
      {
        ok: true,
        id: entry.id,
        webhookDelivered,
        webhookConfigured: Boolean(webhookUrl),
        webhookSource
      },
      { status: 201 }
    );
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
