import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  // 🔥 MOCK (después conectás backend)
  const [data, setData] = useState({
    incidencias: [],
    ordenes: [],
    planes: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        incidencias: [
          { id: 1, estado: "PENDIENTE" },
          { id: 2, estado: "RESUELTA" },
          { id: 3, estado: "PENDIENTE" },
        ],
        ordenes: [
          { id: 1, estado: "ABIERTA" },
          { id: 2, estado: "CERRADA" },
        ],
        planes: [
          { id: 1, frecuenciaDias: 30 },
          { id: 2, frecuenciaDias: 15 },
        ],
      });

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return <p>Cargando dashboard...</p>;
  }

  // 🔥 KPIs
  const incidenciasAbiertas = data.incidencias.filter(
    (i) => i.estado === "PENDIENTE"
  ).length;

  const ordenesAbiertas = data.ordenes.filter(
    (o) => o.estado === "ABIERTA"
  ).length;

  return (
    <div className="space-y-6">

      {/* 🔹 KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Incidencias abiertas</p>
          <h2 className="text-3xl font-bold text-red-500">
            {incidenciasAbiertas}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Órdenes abiertas</p>
          <h2 className="text-3xl font-bold text-orange-500">
            {ordenesAbiertas}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Planes activos</p>
          <h2 className="text-3xl font-bold">
            {data.planes.length}
          </h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total incidencias</p>
          <h2 className="text-3xl font-bold">
            {data.incidencias.length}
          </h2>
        </div>
      </div>

      {/* 🔹 ACTIVIDAD */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Incidencias */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Últimas incidencias
          </h2>

          {data.incidencias.slice(0, 4).map((i) => (
            <div key={i.id} className="border-b py-2 text-sm">
              Incidencia #{i.id} - {i.estado}
            </div>
          ))}
        </div>

        {/* Órdenes */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-3">
            Órdenes recientes
          </h2>

          {data.ordenes.slice(0, 4).map((o) => (
            <div key={o.id} className="border-b py-2 text-sm">
              Orden #{o.id} - {o.estado}
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 ACCIONES */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-3">
          Acciones rápidas
        </h2>

        <div className="flex flex-col sm:flex-row gap-3">

          <Link
            to="/incidencias"
            className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-center w-full"
          >
            Nueva Incidencia
          </Link>

          <Link
            to="/analisis"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-center w-full"
          >
            Ejecutar Análisis
          </Link>

          <Link
            to="/planes"
            className="bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-center w-full"
          >
            Ver Preventivo
          </Link>
        </div>
      </div>

    </div>
  );
}