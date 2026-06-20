import { useEffect, useState } from "react";

export default function Activos() {

  const [loading, setLoading] = useState(true);

  const [activos, setActivos] = useState([]);

  // =========================
  // MOCK DATA
  // =========================

  useEffect(() => {

    setTimeout(() => {

      setActivos([
        {
          id: 1,
          codigo: "COMP-001",
          nombre: "Compresor Industrial A",
          tipo: "Compresor",
          ubicacion: "Planta Norte",
          estado: "OPERATIVO",
        },

        {
          id: 2,
          codigo: "MOT-002",
          nombre: "Motor Principal B",
          tipo: "Motor",
          ubicacion: "Línea 2",
          estado: "EN_MANTENIMIENTO",
        },

        {
          id: 3,
          codigo: "BOM-003",
          nombre: "Bomba Hidráulica C",
          tipo: "Bomba",
          ubicacion: "Sector Producción",
          estado: "FUERA_DE_SERVICIO",
        },

        {
          id: 4,
          codigo: "GEN-004",
          nombre: "Generador Eléctrico D",
          tipo: "Generador",
          ubicacion: "Sala Eléctrica",
          estado: "OPERATIVO",
        },
      ]);

      setLoading(false);

    }, 800);

  }, []);

  if (loading) {

    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">
          Cargando activos...
        </p>
      </div>
    );
  }

  // =========================
  // KPIs
  // =========================

  const operativos = activos.filter(
    (a) => a.estado === "OPERATIVO"
  ).length;

  const mantenimiento = activos.filter(
    (a) => a.estado === "EN_MANTENIMIENTO"
  ).length;

  const fueraServicio = activos.filter(
    (a) => a.estado === "FUERA_DE_SERVICIO"
  ).length;

  return (
    <div className="space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Gestión de Activos
            </h1>

            <p className="text-gray-500 mt-2">
              Consulta y administración de activos industriales registrados en el sistema.
            </p>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl transition font-medium"
          >
            Registrar activo
          </button>
        </div>
      </div>

      {/* ========================= */}
      {/* KPIs */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Activos operativos
          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-2">
            {operativos}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            En mantenimiento
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {mantenimiento}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">

          <p className="text-sm text-gray-500">
            Fuera de servicio
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {fueraServicio}
          </h2>
        </div>
      </div>

      {/* ========================= */}
      {/* TABLA */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">

        <div className="p-6 border-b">

          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

            <h2 className="text-xl font-semibold">
              Listado de activos
            </h2>

            <input
              type="text"
              placeholder="Buscar activo..."
              className="border rounded-xl px-4 py-2 w-full lg:w-80 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100 border-b">

              <tr className="text-left text-sm text-gray-600">

                <th className="px-5 py-4">
                  Código
                </th>

                <th className="px-5 py-4">
                  Nombre
                </th>

                <th className="px-5 py-4">
                  Tipo
                </th>

                <th className="px-5 py-4">
                  Ubicación
                </th>

                <th className="px-5 py-4">
                  Estado
                </th>

                <th className="px-5 py-4 text-center">
                  Acciones
                </th>
              </tr>
            </thead>

            <tbody>

              {activos.map((activo) => (

                <tr
                  key={activo.id}
                  className="border-b hover:bg-gray-50 transition"
                >

                  {/* CODIGO */}
                  <td className="px-5 py-4 font-medium">
                    {activo.codigo}
                  </td>

                  {/* NOMBRE */}
                  <td className="px-5 py-4">
                    {activo.nombre}
                  </td>

                  {/* TIPO */}
                  <td className="px-5 py-4">
                    {activo.tipo}
                  </td>

                  {/* UBICACION */}
                  <td className="px-5 py-4 text-gray-600">
                    {activo.ubicacion}
                  </td>

                  {/* ESTADO */}
                  <td className="px-5 py-4">

                    <span
                      className={`text-xs px-3 py-1 rounded-full font-medium ${
                        activo.estado === "OPERATIVO"
                          ? "bg-green-100 text-green-700"
                          : activo.estado === "EN_MANTENIMIENTO"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activo.estado}
                    </span>
                  </td>

                  {/* ACCIONES */}
                  <td className="px-5 py-4">

                    <div className="flex justify-center gap-2">

                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-xl transition"
                      >
                        Ver detalle
                      </button>

                      <button
                        className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-xl transition"
                      >
                        Editar
                      </button>

                      <button
                        className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-xl transition"
                      >
                        Baja
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
          Resumen general
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Total activos
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {activos.length}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Compresores
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {
                activos.filter(
                  (a) => a.tipo === "Compresor"
                ).length
              }
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Motores
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {
                activos.filter(
                  (a) => a.tipo === "Motor"
                ).length
              }
            </h3>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">

            <p className="text-sm text-gray-500">
              Bombas
            </p>

            <h3 className="text-2xl font-bold mt-2">
              {
                activos.filter(
                  (a) => a.tipo === "Bomba"
                ).length
              }
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}