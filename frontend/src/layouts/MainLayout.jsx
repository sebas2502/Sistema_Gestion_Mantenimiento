import { useState } from "react";
import { Link } from "react-router-dom";

export default function MainLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">

      
      <aside
  className={`
    fixed md:static top-0 left-0 h-full w-64 bg-gray-900 text-white p-4 z-40
    transform ${open ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0 transition-transform duration-300
  `}
>
        <h1 className="text-xl font-bold mb-6">Mantenimiento</h1>

        <nav className="space-y-3">
          <Link to="/dashboard" onClick={() => setOpen(false)} className="block hover:text-gray-300">
            Dashboard
          </Link>

          <Link to="/incidencias" onClick={() => setOpen(false)} className="block hover:text-gray-300">
            Incidencias
          </Link>

          <Link to="/analisis" onClick={() => setOpen(false)} className="block hover:text-gray-300">
            Análisis
          </Link>

          <Link to="/planes" onClick={() => setOpen(false)} className="block hover:text-gray-300">
            Planes
          </Link>
        </nav>
      </aside>

     
      {open && (
        <div
          className="fixed inset-0 bg-black opacity-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      
      <div className="flex-1 flex flex-col w-full">

        {/* Header */}
       <header className="bg-white shadow p-4 flex items-center justify-between relative z-50">
          <button
            className="md:hidden text-gray-800"
            onClick={() => setOpen(!open)}
          >
            ☰
          </button>

          <h2 className="font-semibold">Sistema de Mantenimiento</h2>
        </header>

        {/* Main */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}