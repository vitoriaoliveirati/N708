'use client';
import SideBar from '../../components/SideBar';
import NavBar from '../../components/NavBar';
import { useEffect, useState } from 'react';
export default function ReservasPage(){
  const [reservas, setReservas] = useState<any[]>([]);
  useEffect(()=> {
    const token = localStorage.getItem('biblio_token');
    if(!token) return;
    fetch('/api/reservas', { headers: { 'x-session-token': token } }).then(r=>r.json()).then(setReservas);
  },[]);
  return (
    <div className="flex">
      <SideBar/>
      <div className="flex-1 flex flex-col">
        <NavBar/>
        <main className="ml-56 flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Minhas Reservas</h1>
          <div>
            {reservas.length===0 ? <p>Nenhuma reserva ainda.</p> : reservas.map(r=>(
              <div key={r.id} className="bg-white p-4 rounded mb-2">Reserva: {r.livroId} • {new Date(r.createdAt).toLocaleString()}</div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
