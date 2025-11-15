'use client';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import { useEffect, useState } from 'react';
export default function BookmarksPage(){
  const [favs, setFavs] = useState<any[]>([]);
  useEffect(()=> {
    const token = localStorage.getItem('biblio_token');
    if(!token) return;
    fetch('/api/favoritos', { headers: { 'x-session-token': token } }).then(r=>r.json()).then(setFavs);
  },[]);
  return (
    <div className="flex">
      <SideBar/>
      <div className="flex-1 flex flex-col">
        <NavBar/>
        <main className="ml-56 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Favoritos</h1>
          <div>{favs.length===0 ? <p>Nenhum favorito ainda.</p> : favs.map(f=> <div key={f.id} className="bg-white p-4 rounded mb-2">Livro: {f.livroId} • {new Date(f.createdAt).toLocaleString()}</div>)}</div>
        </main>
      </div>
    </div>
  )
}
