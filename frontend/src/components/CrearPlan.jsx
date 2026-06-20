import { useState } from "react";

export default function CrearPlanMantenimiento() {
  const [plan, setPlan] = useState({
    activo: "",
    descripcion: "",
    frecuenciaDias: "",
    tipo: "PREVENTIVO",
  });

  const [tareas, setTareas] = useState([]);
  const [nuevaTarea, setNuevaTarea] = useState("");

  // 🔹 MOCK ACTIVOS
  const activos = [
    "Compresor A",
    "Motor B",
    "Bomba C",
    "Generador D",
  ];

  // =========================
  // FORM PLAN
  // =========================

  const handleChange = (e) => {
    setPlan({
      ...plan,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // AGREGAR TAREA
  // =========================

  const agregarTarea = () => {
    if (!nuevaTarea.trim()) return;

    const tarea = {
      id: Date.now(),
      descripcion: nuevaTarea,
    };

    setTareas([...tareas, tarea]);
    setNuevaTarea("");
  };

  // =========================
  // ELIMINAR TAREA
  // =========================

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((t) => t.id !== id));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...plan,
      tareas,
    };

    console.log("PLAN:", payload);

    alert("Plan de mantenimiento creado");

    // RESET
    setPlan({
      activo: "",
      descripcion: "",
      frecuenciaDias: "",
      tipo: "PREVENTIVO",
    });

    setTareas([]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Crear Plan de Mantenimiento
        </h1>

        <p className="text-gray-500 mt-2">
          Definición de planes preventivos y tareas asociadas a activos industriales.
        </p>
      </div>

      {/* ========================= */}
      {/* FORM PLAN */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ACTIVO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Activo
            </label>

            <select
              name="activo"
              value={plan.activo}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">
                Seleccionar activo
              </option>

              {activos.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIPCION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción del plan
            </label>

            <textarea
              name="descripcion"
              value={plan.descripcion}
              onChange={handleChange}
              rows={3}
              placeholder="Ej: Mantenimiento preventivo mensual del sistema hidráulico"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* FRECUENCIA */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Frecuencia (días)
            </label>

            <input
              type="number"
              name="frecuenciaDias"
              value={plan.frecuenciaDias}
              onChange={handleChange}
              placeholder="Ej: 30"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de mantenimiento
            </label>

            <select
              name="tipo"
              value={plan.tipo}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="PREVENTIVO">
                Preventivo
              </option>

              <option value="INSPECCION">
                Inspección
              </option>
            </select>
          </div>

          {/* ========================= */}
          {/* TAREAS */}
          {/* ========================= */}

          <div className="border-t pt-6">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Tareas del plan
            </h2>

            {/* INPUT TAREA */}
            <div className="flex gap-3">

              <input
                type="text"
                value={nuevaTarea}
                onChange={(e) =>
                  setNuevaTarea(e.target.value)
                }
                placeholder="Ej: Revisar presión hidráulica"
                className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-400"
              />

              <button
                type="button"
                onClick={agregarTarea}
                className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-xl transition"
              >
                Agregar
              </button>
            </div>

            {/* LISTADO */}
            <div className="space-y-3 mt-5">

              {tareas.length === 0 && (
                <p className="text-sm text-gray-500">
                  No hay tareas agregadas
                </p>
              )}

              {tareas.map((t) => (
                <div
                  key={t.id}
                  className="flex justify-between items-center border rounded-xl p-3"
                >
                  <p className="text-sm text-gray-700">
                    {t.descripcion}
                  </p>

                  <button
                    type="button"
                    onClick={() => eliminarTarea(t.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* BOTONES */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl transition font-medium"
            >
              Crear plan
            </button>

            <button
              type="button"
              className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}