import { useEffect, useState } from "react";

export default function OrdenesTrabajo() {
  const [loading, setLoading] = useState(true);

  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setOrdenes([
        {
          id: 101,
          activo: "Compresor A",
          tipo: "CORRECTIVO",
          prioridad: "ALTA",
          estado: "EN_PROCESO",
          tecnico: "Carlos Gómez",
          fecha: "2026-05-12",
        },

        {
          id: 102,
          activo: "Motor B",
          tipo: "PREVENTIVO",
          prioridad: "MEDIA",
          estado: "PENDIENTE",
          tecnico: "Ana Fernández",
          fecha: "2026-05-14",
        },

        {
          id: 103,
          activo: "Bomba C",
          tipo: "PREDICTIVO",
          prioridad: "CRITICA",
          estado: "ASIGNADA",
          tecnico: "Luis Martínez",
          fecha: "2026-05-15",
        },
      ]);

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">
          Cargando órdenes de trabajo...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Órdenes de Trabajo
        </h1>

        <p className="text-gray-500 mt-2">
          Gestión y seguimiento de órdenes correctivas, preventivas y predictivas.
        </p>
      </div>

      {/* ========================= */}
      {/* TABLA */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 border-b">

              <tr className="text-left text-sm text-gray-600">

                <th className="px-5 py-4">
                  Orden
                </th>

                <th className="px-5 py-4">
                  Activo
                </th>

                <th className="px-5 py-4">
                  Tipo
                </th>

                <th className="px-5 py-4">
                  Prioridad
                </th>

                <th className="px-5 py-4">
                  Estado
                </th>

                <th className="px-5 py-4">
                  Técnico asignado
                </th>

                <th className="px-5 py-4">
                  Fecha
                </th>

                <th className="px-5 py-4 text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {ordenes.map((o) => (

                <tr
                  key={o.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* ID */}
                  <td className="px-5 py-4 font-medium">
                    #{o.id}
                  </td>

                  {/* ACTIVO */}
                  <td className="px-5 py-4">
                    {o.activo}
                  </td>

                  {/* TIPO */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        o.tipo === "CORRECTIVO"
                          ? "bg-red-100 text-red-600"
                          : o.tipo === "PREVENTIVO"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {o.tipo}
                    </span>
                  </td>

                  {/* PRIORIDAD */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        o.prioridad === "CRITICA"
                          ? "bg-red-200 text-red-700"
                          : o.prioridad === "ALTA"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {o.prioridad}
                    </span>
                  </td>

                  {/* ESTADO */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        o.estado === "EN_PROCESO"
                          ? "bg-blue-100 text-blue-700"
                          : o.estado === "FINALIZADA"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {o.estado}
                    </span>
                  </td>

                  {/* TECNICO */}
                  <td className="px-5 py-4">
                    {o.tecnico}
                  </td>

                  {/* FECHA */}
                  <td className="px-5 py-4 text-gray-600">
                    {o.fecha}
                  </td>

                  {/* ACCIONES */}
                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-2 rounded-lg transition"
                      >
                        Ver detalle
                      </button>

                      <button
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-2 rounded-lg transition"
                      >
                        Actualizar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================= */}
      {/* RESUMEN */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Órdenes correctivas
          </p>

          <h2 className="text-3xl font-bold text-red-500 mt-2">
            {
              ordenes.filter(
                (o) => o.tipo === "CORRECTIVO"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Órdenes preventivas
          </p>

          <h2 className="text-3xl font-bold text-green-500 mt-2">
            {
              ordenes.filter(
                (o) => o.tipo === "PREVENTIVO"
              ).length
            }
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Órdenes predictivas
          </p>

          <h2 className="text-3xl font-bold text-blue-500 mt-2">
            {
              ordenes.filter(
                (o) => o.tipo === "PREDICTIVO"
              ).length
            }
          </h2>
        </div>
      </div>
    </div>
  );
}