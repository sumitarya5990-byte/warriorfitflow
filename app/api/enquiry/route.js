import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';

const localDataFilePath = path.join(process.cwd(), 'data', 'enquiries.json');
const serverlessDataFilePath = '/tmp/warriorfitflow-enquiries.json';
const DEFAULT_WEBHOOK_URL = 'https://webhook.site/2af9dab5-3e20-4a72-9844-d8eeebc27f80';
const WEBHOOK_URL = process.env.enquiry_webhook || process.env.ENQUIRY_WEBHOOK || DEFAULT_WEBHOOK_URL;

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


    let webhookDelivered = false;
    try {
      const webhookResponse = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(entry)
      });
      webhookDelivered = webhookResponse.ok;
    } catch {
      webhookDelivered = false;
    }

    existing.push(entry);
    await fs.writeFile(dataFilePath, JSON.stringify(existing, null, 2), 'utf-8');

    return Response.json({ ok: true, id: entry.id, webhookDelivered }, { status: 201 });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
