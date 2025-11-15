'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [name,setName]=useState('');
  const router = useRouter();

  async function submit(e:any){
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    const data = await res.json();
    if(!res.ok) return alert(data.message || 'Erro no cadastro');
    alert('Cadastro realizado. Faça login.');
    router.push('/login');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Cadastro</h1>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nome" className="mb-3 w-full p-2 border rounded" />
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="mb-3 w-full p-2 border rounded" />
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Senha" className="mb-3 w-full p-2 border rounded" />
        <button className="w-full bg-green-500 text-white p-2 rounded">Cadastrar</button>
      </form>
    </div>
  );
}
