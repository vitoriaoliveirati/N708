'use client';
import { useEffect, useState } from 'react';
export default function NavBar(){
  const [name, setName] = useState<string | null>(null);
  useEffect(()=> {
    const u = localStorage.getItem('biblio_token_user');
    if(u) {
      try { setName(JSON.parse(u).name) } catch(e){}
    }
  },[]);
  return (
    <header className="w-full h-16 bg-blue-500 border-b border-gray-200 flex items-center justify-end px-6">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold">U</div>
        <span className="text-sm text-white font-medium">{name || 'Usuário'}</span>
      </div>
    </header>
  )
}
