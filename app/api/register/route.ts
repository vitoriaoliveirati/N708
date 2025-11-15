import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'data', 'users.json');

function read(p:string){ try { return JSON.parse(fs.readFileSync(p,'utf-8') || '[]'); } catch { return []; } }
function write(p:string, d:any){ fs.writeFileSync(p, JSON.stringify(d, null, 2)); }

export async function POST(request: Request){
  try {
    const body = await request.json();
    if(!body?.email || !body?.password || !body?.name) {
      return NextResponse.json({ message: 'email, password and name required' }, { status: 400 });
    }
    const users = read(usersPath);
    if(users.find((u:any) => u.email === body.email)) {
      return NextResponse.json({ message: 'email already exists' }, { status: 400 });
    }
    const id = 'u' + Date.now().toString();
    users.push({ id, email: body.email, password: body.password, name: body.name });
    write(usersPath, users);
    return NextResponse.json({ message: 'created' }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'internal error' }, { status: 500 });
  }
}
