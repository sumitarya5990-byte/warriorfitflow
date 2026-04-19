import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'enquiries.json');

const validatePayload = (payload) => {
  if (!payload || typeof payload !== 'object') return false;
  const { name, phone, skill, location } = payload;
  const validSkill = ['Calisthenics', 'MMA', 'Both'].includes(skill);
  const validLocation = ['Location 1', 'Location 2', 'Location 3'].includes(location);
  return Boolean(name?.trim()) && /^\d{10,15}$/.test(String(phone).trim()) && validSkill && validLocation;
};

export async function POST(request) {
  try {
    const payload = await request.json();

    if (!validatePayload(payload)) {
      return Response.json({ error: 'Invalid payload' }, { status: 400 });
    }

    await fs.mkdir(path.dirname(dataFilePath), { recursive: true });

    let existing = [];
    try {
      const file = await fs.readFile(dataFilePath, 'utf-8');
      existing = JSON.parse(file);
    } catch {
      existing = [];
    }

    const entry = {
      id: crypto.randomUUID(),
      ...payload,
      createdAt: new Date().toISOString()
    };

    existing.push(entry);
    await fs.writeFile(dataFilePath, JSON.stringify(existing, null, 2));

    return Response.json({ ok: true, id: entry.id }, { status: 201 });
  } catch {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
