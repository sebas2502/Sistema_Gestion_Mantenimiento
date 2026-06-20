import { useState } from "react";

export default function RegistroActivo() {
  const [form, setForm] = useState({
    codigo: "",
    nombre: "",
    tipo: "",
    ubicacion: "",
    estado: "OPERATIVO",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Activo registrado:", form);

    alert("Activo registrado correctamente");

    // 🔹 Reset
    setForm({
      codigo: "",
      nombre: "",
      tipo: "",
      ubicacion: "",
      estado: "OPERATIVO",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Registrar Activo
        </h1>

        <p className="text-gray-500 mt-2">
          Alta de activos industriales dentro del sistema de mantenimiento.
        </p>
      </div>

      {/* FORM */}
      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* CODIGO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Código del activo
            </label>

            <input
              type="text"
              name="codigo"
              value={form.codigo}
              onChange={handleChange}
              placeholder="Ej: ACT-001"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del activo
            </label>

            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Compresor Industrial"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* TIPO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de activo
            </label>

            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">
                Seleccionar tipo
              </option>

              <option value="MOTOR">
                Motor
              </option>

              <option value="COMPRESOR">
                Compresor
              </option>

              <option value="BOMBA">
                Bomba
              </option>

              <option value="GENERADOR">
                Generador
              </option>

              <option value="OTRO">
                Otro
              </option>
            </select>
          </div>

          {/* UBICACION */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ubicación
            </label>

            <input
              type="text"
              name="ubicacion"
              value={form.ubicacion}
              onChange={handleChange}
              placeholder="Ej: Planta 1 - Sector Norte"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* ESTADO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado inicial
            </label>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="OPERATIVO">
                Operativo
              </option>

              <option value="EN_MANTENIMIENTO">
                En mantenimiento
              </option>

              <option value="FUERA_DE_SERVICIO">
                Fuera de servicio
              </option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition font-medium"
            >
              Registrar activo
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