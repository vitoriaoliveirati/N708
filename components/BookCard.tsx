'use client';
import React from 'react';
export type Book = { id: string; titulo: string; autor: string; imagem: string; sinopse: string; disponivel: boolean; }
export default function BookCard({ book, onClick }: { book: Book, onClick: (b: Book)=>void }){
  return (
    <div className="bg-white rounded shadow p-3 cursor-pointer" onClick={()=>onClick(book)}>
      <img src={book.imagem} alt={book.titulo} className="w-full h-44 object-cover rounded"/>
      <h3 className="mt-2 font-semibold text-gray-800">{book.titulo}</h3>
      <p className="text-sm text-gray-600">{book.autor}</p>
      <p className="text-sm mt-2">{book.disponivel ? 'Disponível' : 'Indisponível'}</p>
    </div>
  )
}
