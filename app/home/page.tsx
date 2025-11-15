'use client';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import BookCard, { Book } from '../../components/BookCard';
import BookModal from '../../components/BookModal';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [selected, setSelected] = useState<Book | null>(null);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    fetch('/api/livros')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(setBooks)
      .catch(() => {});
  }, [refresh]);

  return (
    <div className="flex">
      <SideBar />

      <div className="flex-1 flex flex-col">

        <NavBar />

        <main className="md:ml-56 ml-0 flex-1 p-8">
          <h1 className="text-3xl font-bold mb-6">Biblioteca</h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {books.map(b => (
              <BookCard key={b.id} book={b} onClick={setSelected} />
            ))}
          </div>

          <BookModal
            isOpen={!!selected}
            book={selected}
            onClose={() => setSelected(null)}
            onUpdated={() => setRefresh(r => r + 1)}
          />
        </main>

      </div>
    </div>
  );
}
