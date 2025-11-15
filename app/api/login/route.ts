import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');
const sessionsPath = path.join(process.cwd(), 'data', 'sessions.json');

function read(p:string){ try { return JSON.parse(fs.readFileSync(p,'utf-8') || '[]'); } catch { return []; } }
function write(p:string, d:any){ fs.writeFileSync(p, JSON.stringify(d, null, 2)); }

export async function POST(request: Request){
  try {
    const body = await request.json();
    if(!body?.email || !body?.password) {
      return NextResponse.json({ message: 'email and password required' }, { status: 400 });
    }
    const users = read(usersPath);
    const user = users.find((u:any) => u.email === body.email && u.password === body.password);
    if(!user) return NextResponse.json({ message: 'invalid credentials' }, { status: 401 });
    const token = Math.random().toString(36).slice(2);
    const sessions = read(sessionsPath);
    sessions.push({ id: token, userId: user.id, createdAt: new Date().toISOString() });
    write(sessionsPath, sessions);
    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    return NextResponse.json({ message: 'internal error' }, { status: 500 });
  }
}
