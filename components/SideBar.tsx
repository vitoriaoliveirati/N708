"use client";
import { Home, Search, Bookmark, Calendar, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function logout() {
    localStorage.removeItem("biblio_token");
    localStorage.removeItem("biblio_token_user");
    router.push("/login");
  }

  return (
    <>
      {/* Botão mobile (abre menu) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-500 text-white p-2 rounded-lg"
        onClick={() => setOpen(true)}
      >
        <Menu size={22} />
      </button>

      {/* Overlay escuro Mobile */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 w-56 bg-[#1e1e2f] text-white h-screen flex flex-col justify-between z-50
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}
      >
        <div>
          <h1 className="text-2xl font-extrabold text-white text-center py-6 border-b border-gray-700">
            Biblio<span className="text-blue-400">Conecta</span>
          </h1>

          <nav className="flex flex-col mt-4" onClick={() => setOpen(false)}>
            <Link href="/home" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
              <Home size={20} /> Home
            </Link>

            <Link href="/search" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
              <Search size={20} /> Procurar
            </Link>

            <Link href="/bookmarks" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
              <Bookmark size={20} /> Favoritos
            </Link>

            <Link href="/reservas" className="flex items-center gap-3 px-6 py-3 hover:bg-[#2a2a3d] transition">
              <Calendar size={20} /> Reservas
            </Link>
          </nav>
        </div>

        {/* BOTÃO DE SAIR */}
        <div className="mb-6 px-6">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 bg-red-500 hover:bg-red-600 transition rounded-lg"
          >
            <LogOut size={20} /> Sair
          </button>
        </div>
      </aside>
    </>
  );
}
