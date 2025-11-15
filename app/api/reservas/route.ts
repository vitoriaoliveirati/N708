import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const reservasPath = path.join(process.cwd(),'data','reservas.json');
const livrosPath = path.join(process.cwd(),'data','livros.json');
const sessionsPath = path.join(process.cwd(),'data','sessions.json');
function read(p:string){ return JSON.parse(fs.readFileSync(p,'utf-8')) }
function write(p:string,d:any){ fs.writeFileSync(p, JSON.stringify(d,null,2)) }
function auth(req:Request){ const token = req.headers.get('x-session-token'); if(!token) return null; const s = read(sessionsPath); return s.find((x:any)=>x.id===token) || null; }
export async function GET(req: Request){ const session = auth(req); if(!session) return NextResponse.json({message:'unauthenticated'},{status:401}); const reservas = read(reservasPath).filter((r:any)=>r.userId===session.userId); return NextResponse.json(reservas); }
export async function POST(req: Request){ const session = auth(req); if(!session) return NextResponse.json({message:'unauthenticated'},{status:401}); const body = await req.json(); if(!body?.livroId) return NextResponse.json({message:'livroId required'},{status:400}); const livros = read(livrosPath); const livro = livros.find((l:any)=>l.id===body.livroId); if(!livro) return NextResponse.json({message:'livro not found'},{status:404}); if(!livro.disponivel) return NextResponse.json({message:'livro unavailable'},{status:400}); livro.disponivel = false; write(livrosPath, livros); const reservas = read(reservasPath); const id = Date.now().toString(); const nova = { id, livroId: livro.id, userId: session.userId, createdAt: new Date().toISOString() }; reservas.push(nova); write(reservasPath, reservas); return NextResponse.json(nova,{status:201}); }
