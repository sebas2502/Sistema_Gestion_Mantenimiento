export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Mantenimiento</h1>
        <nav className="space-y-2">
         {/* <a href="/dashboard">Dashboard</a>  */} 
          <a href="/incidencias">Incidencias</a>
          {/* <a href="/ordenes">Órdenes</a>*/}
           {/*<a href="/analisis">Análisis</a>*/}
           {/*<a href="/planes">Planes</a>*/}
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}