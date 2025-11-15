import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
const favPath = path.join(process.cwd(),'data','favoritos.json');
const sessionsPath = path.join(process.cwd(),'data','sessions.json');
function read(p:string){ return JSON.parse(fs.readFileSync(p,'utf-8')) }
function write(p:string,d:any){ fs.writeFileSync(p, JSON.stringify(d,null,2)) }
function auth(req:Request){ const token = req.headers.get('x-session-token'); if(!token) return null; const s = read(sessionsPath); return s.find((x:any)=>x.id===token) || null; }
export async function GET(req: Request){ const session = auth(req); if(!session) return NextResponse.json({message:'unauthenticated'},{status:401}); const favs = read(favPath).filter((f:any)=>f.userId===session.userId); return NextResponse.json(favs); }
export async function POST(req: Request){ const session = auth(req); if(!session) return NextResponse.json({message:'unauthenticated'},{status:401}); const body = await req.json(); if(!body?.livroId) return NextResponse.json({message:'livroId required'},{status:400}); const favs = read(favPath); if(favs.find((f:any)=>f.userId===session.userId && f.livroId===body.livroId)) return NextResponse.json({message:'already favorited'},{status:400}); const item = { id: Date.now().toString(), userId: session.userId, livroId: body.livroId, createdAt: new Date().toISOString() }; favs.push(item); write(favPath, favs); return NextResponse.json(item,{status:201}); }
