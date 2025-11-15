'use client';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import BookCard from '../../components/BookCard';
import { useEffect, useState } from 'react';
export default function SearchPage(){
  const [books,setBooks] = useState<any[]>([]);
  const [query,setQuery]=useState('');
  useEffect(()=>{ fetch('/api/livros').then(r=>r.json()).then(setBooks) },[]);
  const filtered = books.filter(b=> b.titulo.toLowerCase().includes(query.toLowerCase()) || b.autor.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="flex">
      <SideBar/>
      <div className="flex-1 flex flex-col">
        <NavBar/>
        <main className="ml-56 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Procurar</h1>
          <input value={query} onChange={e=>setQuery(e.target.value)} className="mb-4 p-2 border rounded" placeholder="Buscar por título ou autor"/>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {filtered.map(b=> <BookCard key={b.id} book={b} onClick={()=>{}} />)}
          </div>
        </main>
      </div>
    </div>
  )
}
