'use client';
import React, { useState } from 'react';
import { Book } from './BookCard';
export default function BookModal({ isOpen, book, onClose, onUpdated }: { isOpen: boolean, book: Book | null, onClose: ()=>void, onUpdated?: ()=>void }){
  const [loading, setLoading] = useState(false);
  if(!isOpen || !book) return null;
  const token = typeof window !== 'undefined' ? localStorage.getItem('biblio_token') : null;
  async function reservar(){
    if(!token) return alert('Faça login para reservar');
    setLoading(true);
    const res = await fetch('/api/reservas', { method:'POST', headers: { 'Content-Type':'application/json','x-session-token': token }, body: JSON.stringify({ livroId: book.id }) });
    const data = await res.json();
    setLoading(false);
    if(!res.ok) return alert(data.message || 'Erro');
    alert('Reserva criada!');
    onUpdated && onUpdated();
    onClose();
  }
  async function favoritar(){
    if(!token) return alert('Faça login para favoritar');
    setLoading(true);
    const res = await fetch('/api/favoritos', { method:'POST', headers: { 'Content-Type':'application/json','x-session-token': token }, body: JSON.stringify({ livroId: book.id }) });
    const data = await res.json();
    setLoading(false);
    if(!res.ok) return alert(data.message || 'Erro');
    alert('Adicionado aos favoritos!');
    onUpdated && onUpdated();
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded p-6 max-w-xl w-full">
        <div className="flex gap-4">
          <img src={book.imagem} className="w-32 h-44 object-cover rounded" />
          <div>
            <h2 className="text-xl font-bold">{book.titulo}</h2>
            <p className="text-sm text-gray-600">{book.autor}</p>
            <p className="mt-2">{book.sinopse}</p>
            <div className="mt-4">{book.disponivel ? <span className="px-3 py-1 bg-green-200 rounded">Disponível</span> : <span className="px-3 py-1 bg-red-200 rounded">Indisponível</span>}</div>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Fechar</button>
          <button onClick={favoritar} disabled={loading} className="px-4 py-2 bg-yellow-300 rounded">Favoritar</button>
          <button onClick={reservar} disabled={loading || !book.disponivel} className="px-4 py-2 bg-blue-500 text-white rounded">{book.disponivel ? 'Reservar' : 'Indisponível'}</button>
        </div>
      </div>
    </div>
  )
}
