import { useState } from "react";

export default function RegistrarUsuario() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rol: "",
    password: "",
    estado: "ACTIVO",
  });

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("USUARIO:", form);

    alert("Usuario registrado correctamente");

    // RESET
    setForm({
      nombre: "",
      apellido: "",
      email: "",
      telefono: "",
      rol: "",
      password: "",
      estado: "ACTIVO",
    });
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Registrar Usuario
        </h1>

        <p className="text-gray-500 mt-2">
          Alta de usuarios y asignación de roles dentro del sistema de gestión de mantenimiento.
        </p>
      </div>

      {/* ========================= */}
      {/* FORM */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* NOMBRE */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>

            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* APELLIDO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido
            </label>

            <input
              type="text"
              name="apellido"
              value={form.apellido}
              onChange={handleChange}
              placeholder="Ej: Pérez"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="usuario@empresa.com"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* TELEFONO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Teléfono
            </label>

            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              placeholder="Ej: 3794123456"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* ROL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rol del usuario
            </label>

            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">
                Seleccionar rol
              </option>

              <option value="ADMINISTRADOR">
                Administrador
              </option>

              <option value="SUPERVISOR">
                Supervisor
              </option>

              <option value="INGENIERO">
                Ingeniero / Jefe de mantenimiento
              </option>

              <option value="OPERARIO">
                Operario
              </option>

              <option value="TECNICO">
                Técnico de mantenimiento
              </option>
            </select>
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* ESTADO */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estado
            </label>

            <select
              name="estado"
              value={form.estado}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="ACTIVO">
                Activo
              </option>

              <option value="INACTIVO">
                Inactivo
              </option>
            </select>
          </div>

          {/* BOTONES */}
          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition font-medium"
            >
              Registrar usuario
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