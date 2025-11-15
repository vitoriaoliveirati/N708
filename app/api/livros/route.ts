import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const p = path.join(process.cwd(),'data','livros.json');
export async function GET(){ const raw = fs.readFileSync(p,'utf-8'); return NextResponse.json(JSON.parse(raw)); }
