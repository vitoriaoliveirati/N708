'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const router = useRouter();

  async function submit(e:any){
    e.preventDefault();
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{ 'Content-Type':'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if(!res.ok) return alert(data.message || 'Credenciais inválidas');
    localStorage.setItem('biblio_token', data.token);
    localStorage.setItem('biblio_token_user', JSON.stringify(data.user));
    alert('Logado como ' + data.user.name);
    router.push('/');
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h1 className="text-xl font-bold mb-4">Entrar</h1>
        
        <input
          value={email}
          onChange={e=>setEmail(e.target.value)}
          placeholder="Email"
          className="mb-3 w-full p-2 border rounded"
        />

        <input
          value={password}
          onChange={e=>setPassword(e.target.value)}
          type="password"
          placeholder="Senha"
          className="mb-3 w-full p-2 border rounded"
        />

        <button className="w-full bg-blue-500 text-white p-2 rounded">Entrar</button>

        <button
          type="button"
          onClick={() => router.push('/register')}
          className="w-full bg-gray-200 text-gray-700 p-2 rounded mt-3"
        >
          Criar conta
        </button>

        <p className="text-sm text-gray-500 mt-2">
          Exemplo: vitoria@example.com / senha123
        </p>
      </form>
    </div>
  );
}
