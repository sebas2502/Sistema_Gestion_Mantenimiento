import { useEffect, useState } from "react";
import {
  obtenerIncidencias,
  crearIncidencia,
} from "../api/incidencias";
import { obtenerActivos } from "../api/activos"; // 🔥 FALTABA

export default function Incidencias() {
  const [incidencias, setIncidencias] = useState([]);
  const [activos, setActivos] = useState([]);
  const [activoId, setActivoId] = useState("");
  const [descripcion, setDescripcion] = useState("");

  useEffect(() => {
    cargar();
    cargarActivos();
  }, []);

  // =========================
  // 🔄 CARGAR INCIDENCIAS
  // =========================
  const cargar = async () => {
    const res = await obtenerIncidencias();
    console.log("BACK:", res);

    setIncidencias(res.data || res);
  };

  // =========================
  // 🔄 CARGAR ACTIVOS
  // =========================
  const cargarActivos = async () => {
    const res = await obtenerActivos();
    console.log("ACTIVOS:", res);

    setActivos(res.data || res);
  };

  // =========================
  // 🎨 COLORES
  // =========================
  const colorCriticidad = {
    ALTA: "text-red-600",
    MEDIA: "text-yellow-600",
    BAJA: "text-green-600",
  };

  // =========================
  // ➕ CREAR INCIDENCIA
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔥 VALIDACIÓN
    if (!descripcion) {
      alert("Ingresá una descripción");
      return;
    }

    if (!activoId) {
      alert("Seleccioná un activo");
      return;
    }

    // 🔥 OBJETO CORRECTO
    const nueva = {
      descripcion,
      criticidad: "ALTA", 
      activo: { id: Number(activoId) },
    };

    const res = await crearIncidencia(nueva);
    console.log("CREADA:", res);

    // 🔄 limpiar form
    setDescripcion("");
    setActivoId("");

    await cargar();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Incidencias</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-6"
      >
        {/* SELECT ACTIVO */}
        <select
          value={activoId}
          onChange={(e) => setActivoId(e.target.value)}
          className="border p-2 w-full mb-2"
        >
          <option value="">Seleccionar activo</option>

          {activos.map((a) => (
            <option key={a.id} value={a.id}>
              {a.nombre}
            </option>
          ))}
        </select>

        {/* INPUT DESCRIPCIÓN */}
        <input
          type="text"
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Incidencia
        </button>
      </form>

      {/* LISTA */}
      <div className="bg-white shadow p-4 rounded">
        {incidencias.length === 0 ? (
          <p>No hay incidencias cargadas</p>
        ) : (
          incidencias.map((i) => (
            <div key={i.id} className="border rounded p-4 mb-3 shadow-sm">
              <div className="flex justify-between">
                <h2 className="font-bold">{i.descripcion}</h2>
                <span className="text-sm">{i.estado}</span>
              </div>

              <p className="text-sm text-gray-600">
                Activo: {i.activo?.nombre || "N/A"}
              </p>

              <p className="text-sm">
                Criticidad:{" "}
                <span className={colorCriticidad[i.criticidad]}>
                  {i.criticidad}
                </span>
              </p>

              <p className="text-xs text-gray-500">
                {new Date(i.fechaReporte).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}