import { useEffect, useState } from "react";

export default function HistorialMantenimiento() {

  const [loading, setLoading] = useState(true);

  const [activo, setActivo] = useState(null);

  const [historial, setHistorial] = useState([]);

  // =========================
  // MOCK DATA
  // =========================

  useEffect(() => {

    setTimeout(() => {

      setActivo({
        id: 1,
        nombre: "Compresor Industrial A",
        codigo: "COMP-001",
        ubicacion: "Planta Norte",
        estado: "OPERATIVO",
      });

      setHistorial([
        {
          id: 101,
          fecha: "2026-05-10",
          tipo: "CORRECTIVO",
          descripcion:
            "Reemplazo de manguera hidráulica",
          tecnico: "Carlos Gómez",
          estado: "FINALIZADA",
        },

        {
          id: 102,
          fecha: "2026-04-22",
          tipo: "PREVENTIVO",
          descripcion:
            "Lubricación general y ajuste de presión",
          tecnico: "Ana Fernández",
          estado: "FINALIZADA",
        },

        {
          id: 103,
          fecha: "2026-03-18",
          tipo: "PREDICTIVO",
          descripcion:
            "Inspección por aumento de vibraciones",
          tecnico: "Luis Martínez",
          estado: "FINALIZADA",
        },

        {
          id: 104,
          fecha: "2026-02-11",
          tipo: "CORRECTIVO",
          descripcion:
            "Cambio de válvula principal",
          tecnico: "Carlos Gómez",
          estado: "FINALIZADA",
        },
      ]);

      setLoading(false);

    }, 800);

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">
          Cargando historial...
        </p>
      </div>
    );
  }

  // =========================
  // KPIs
  // =========================

  const correctivos = historial.filter(
    (h) => h.tipo === "CORRECTIVO"
  ).length;

  const preventivos = historial.filter(
    (h) => h.tipo === "PREVENTIVO"
  ).length;

  const predictivos = historial.filter(
    (h) => h.tipo === "PREDICTIVO"
  ).length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Historial de Mantenimiento
            </h1>

            <p className="text-gray-500 mt-2">
              Consulta del historial completo de intervenciones y órdenes asociadas al activo.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-4 min-w-[250px]">

            <p className="text-sm text-gray-500">
              Activo seleccionado
            </p>

            <h2 className="text-xl font-bold mt-1">
              {activo.nombre}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Código: {activo.codigo}
            </p>

            <p className="text-sm text-gray-500">
              Ubicación: {activo.ubicacion}
            </p>
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* KPIs */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Mantenimientos correctivos
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {correctivos}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Mantenimientos preventivos
          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-2">
            {preventivos}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Mantenimientos predictivos
          </p>

          <h2 className="text-4xl font-bold text-blue-500 mt-2">
            {predictivos}
          </h2>
        </div>
      </div>

      {/* ========================= */}
      {/* TABLA HISTORIAL */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <h2 className="text-xl font-semibold">
            Historial de órdenes e intervenciones
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 border-b">

              <tr className="text-left text-sm text-gray-600">

                <th className="px-5 py-4">
                  Orden
                </th>

                <th className="px-5 py-4">
                  Fecha
                </th>

                <th className="px-5 py-4">
                  Tipo
                </th>

                <th className="px-5 py-4">
                  Descripción
                </th>

                <th className="px-5 py-4">
                  Técnico
                </th>

                <th className="px-5 py-4">
                  Estado
                </th>

                <th className="px-5 py-4 text-center">
                  Acción
                </th>
              </tr>
            </thead>

            <tbody>

              {historial.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* ORDEN */}
                  <td className="px-5 py-4 font-medium">
                    #{item.id}
                  </td>

                  {/* FECHA */}
                  <td className="px-5 py-4 text-gray-600">
                    {item.fecha}
                  </td>

                  {/* TIPO */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        item.tipo === "CORRECTIVO"
                          ? "bg-red-100 text-red-600"
                          : item.tipo === "PREVENTIVO"
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {item.tipo}
                    </span>
                  </td>

                  {/* DESCRIPCION */}
                  <td className="px-5 py-4 text-gray-700">
                    {item.descripcion}
                  </td>

                  {/* TECNICO */}
                  <td className="px-5 py-4">
                    {item.tecnico}
                  </td>

                  {/* ESTADO */}
                  <td className="px-5 py-4">

                    <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                      {item.estado}
                    </span>
                  </td>

                  {/* ACCION */}
                  <td className="px-5 py-4">

                    <div className="flex justify-center">

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl transition"
                      >
                        Ver detalle
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

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Resumen del activo
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Total intervenciones
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {historial.length}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Último mantenimiento
            </p>

            <h3 className="text-lg font-bold mt-2">
              {historial[0]?.fecha}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Estado del activo
            </p>

            <h3 className="text-lg font-bold text-green-600 mt-2">
              {activo.estado}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Ubicación
            </p>

            <h3 className="text-lg font-bold mt-2">
              {activo.ubicacion}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}