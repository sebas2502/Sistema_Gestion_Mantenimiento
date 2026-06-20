import { useEffect, useState } from "react";

export default function DetalleOrdenTrabajo() {

  const [orden, setOrden] = useState(null);

  // =========================
  // MOCK DATA
  // =========================

  useEffect(() => {

    setOrden({
      id: 101,
      activo: "Compresor A",
      tipo: "CORRECTIVO",
      estado: "EN_PROCESO",
      prioridad: "ALTA",
      tecnico: "Carlos Gómez",
      fecha: "2026-05-15",

      detalles: [
        {
          id: 1,
          descripcion: "Inspeccionar fuga hidráulica",
          completado: true,
        },

        {
          id: 2,
          descripcion: "Reemplazar manguera dañada",
          completado: false,
        },

        {
          id: 3,
          descripcion: "Verificar presión del sistema",
          completado: false,
        },
      ],
    });

  }, []);

  // =========================
  // TOGGLE TAREA
  // =========================

  const toggleDetalle = (detalleId) => {

    setOrden((prev) => ({
      ...prev,

      detalles: prev.detalles.map((d) =>
        d.id === detalleId
          ? {
              ...d,
              completado: !d.completado,
            }
          : d
      ),
    }));
  };

  // =========================
  // VALIDAR SI TODAS COMPLETAS
  // =========================

  const todasCompletadas =
    orden?.detalles.every((d) => d.completado);

  // =========================
  // CERRAR ORDEN
  // =========================

  const cerrarOrden = () => {

    if (!todasCompletadas) {
      return alert(
        "Debes completar todas las tareas antes de cerrar la orden"
      );
    }

    if (!window.confirm("¿Cerrar orden de trabajo?")) return;

    setOrden({
      ...orden,
      estado: "FINALIZADA",
    });

    alert("Orden cerrada correctamente");
  };

  if (!orden) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">
          Cargando orden...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">

          <div>

            <h1 className="text-3xl font-bold text-gray-800">
              Orden #{orden.id}
            </h1>

            <p className="text-gray-500 mt-2">
              Ejecución y seguimiento de tareas de mantenimiento.
            </p>
          </div>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium w-fit ${
              orden.estado === "FINALIZADA"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {orden.estado}
          </span>
        </div>
      </div>

      {/* ========================= */}
      {/* INFO GENERAL */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Activo
          </p>

          <h2 className="text-xl font-bold mt-2">
            {orden.activo}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Tipo de orden
          </p>

          <h2 className="text-xl font-bold mt-2">
            {orden.tipo}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Prioridad
          </p>

          <h2 className="text-xl font-bold mt-2 text-red-500">
            {orden.prioridad}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <p className="text-sm text-gray-500">
            Técnico asignado
          </p>

          <h2 className="text-xl font-bold mt-2">
            {orden.tecnico}
          </h2>
        </div>
      </div>

      {/* ========================= */}
      {/* TAREAS */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex justify-between items-center mb-5">

          <div>

            <h2 className="text-xl font-semibold">
              Tareas de mantenimiento
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Marcar las tareas completadas durante la intervención.
            </p>
          </div>

          <div className="bg-gray-100 px-4 py-2 rounded-xl text-sm">
            {
              orden.detalles.filter((d) => d.completado)
                .length
            }
            /{orden.detalles.length} completadas
          </div>
        </div>

        <div className="space-y-4">

          {orden.detalles.map((detalle) => (

            <div
              key={detalle.id}
              className={`border rounded-2xl p-4 flex items-center justify-between transition ${
                detalle.completado
                  ? "bg-green-50 border-green-200"
                  : "bg-white"
              }`}
            >

              <div className="flex items-center gap-4">

                <input
                  type="checkbox"
                  checked={detalle.completado}
                  onChange={() =>
                    toggleDetalle(detalle.id)
                  }
                  className="w-5 h-5"
                  disabled={orden.estado === "FINALIZADA"}
                />

                <div>

                  <p
                    className={`font-medium ${
                      detalle.completado
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {detalle.descripcion}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Detalle #{detalle.id}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  detalle.completado
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {detalle.completado
                  ? "COMPLETADA"
                  : "PENDIENTE"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* ACCIONES */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <div className="flex flex-col md:flex-row gap-4">

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl transition font-medium"
          >
            Actualizar avance
          </button>

          <button
            onClick={cerrarOrden}
            disabled={
              !todasCompletadas ||
              orden.estado === "FINALIZADA"
            }
            className={`py-3 px-6 rounded-xl transition font-medium ${
              todasCompletadas &&
              orden.estado !== "FINALIZADA"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Cerrar orden
          </button>
        </div>

        {!todasCompletadas &&
          orden.estado !== "FINALIZADA" && (

          <p className="text-sm text-red-500 mt-4">
            Debes completar todas las tareas antes de cerrar la orden.
          </p>
        )}
      </div>
    </div>
  );
}