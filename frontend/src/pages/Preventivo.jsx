import { useEffect, useState } from "react";
import BuscadorActivo from "../components/BuscarActivo";
import { obtenerPlanes, ejecutarPlanes } from "../api/planes";

export default function Preventivo() {
  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [resultado, setResultado] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPlanes, setLoadingPlanes] = useState(false);

  // 🔥 CARGAR PLANES REALES
  useEffect(() => {
    cargarPlanes();
  }, []);

  const cargarPlanes = async () => {
    try {
      setLoadingPlanes(true);

      const res = await obtenerPlanes();

      console.log("PLANES:", res);

      setPlanes(res);

    } catch (error) {
      console.error("ERROR PLANES:", error);
      alert("Error al cargar planes");
    } finally {
      setLoadingPlanes(false);
    }
  };

  // 🔥 FILTRADO
  const planesFiltrados = activoSeleccionado
    ? planes.filter((p) => p.activo?.id === activoSeleccionado.id)
    : planes;

  // 🔥 CALCULO LOCAL (solo visual)
  const calcularDias = (fecha) => {
    const hoy = new Date();
    const ultima = new Date(fecha);
    return Math.floor((hoy - ultima) / (1000 * 60 * 60 * 24));
  };

  // 🔥 EJECUCIÓN REAL
  const ejecutarPreventivoHandler = async () => {
    if (!window.confirm("¿Ejecutar evaluación de planes?")) return;

    try {
      setLoading(true);

      const res = await ejecutarPlanes();

      console.log("RESULTADO:", res.data);

      setResultado(res.data.data || res.data);

    } catch (error) {
      console.error("ERROR PREVENTIVO:", error.response || error);
      alert("Error al ejecutar preventivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">

      {/* 🔹 TÍTULO */}
      <div>
        <h1 className="text-2xl font-bold">
          Mantenimiento Preventivo
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Evaluación de planes de mantenimiento según frecuencia definida.
        </p>
      </div>

      {/* 🔹 BUSCADOR */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <label className="text-sm text-gray-600">
          Filtrar por activo
        </label>

        <BuscadorActivo onSelect={setActivoSeleccionado} />

        {activoSeleccionado && (
          <div className="bg-gray-100 p-2 rounded text-sm">
            {activoSeleccionado.nombre}
          </div>
        )}
      </div>

      {/* 🔹 LISTA DE PLANES */}
      <div className="bg-white p-4 rounded-xl shadow space-y-4">
        <h2 className="font-semibold">Planes de mantenimiento</h2>

        {loadingPlanes && (
          <p className="text-gray-500 text-sm">
            Cargando planes...
          </p>
        )}

        {!loadingPlanes && planesFiltrados.length === 0 && (
          <p className="text-gray-500 text-sm">
            No hay planes disponibles
          </p>
        )}

        {planesFiltrados.map((plan) => {
          const dias = calcularDias(plan.fechaUltimaEjecucion);
          const vencido = dias >= plan.frecuenciaDias;

          return (
            <div key={plan.id} className="border p-3 rounded space-y-1">
              <p className="font-medium">
                {plan.nombre || "Sin activo"}
              </p>

              <p className="text-sm text-gray-500">
                Frecuencia: {plan.frecuenciaDias} días
              </p>

              <p className="text-sm text-gray-500">
                Última ejecución:{" "}
                {new Date(plan.fechaUltimaEjecucion).toLocaleDateString()}
              </p>

              <p
                className={`text-sm font-medium ${
                  vencido ? "text-red-500" : "text-green-500"
                }`}
              >
                {vencido ? "Vencido" : "Al día"}
              </p>
            </div>
          );
        })}

        {/* BOTÓN */}
        <button
          onClick={ejecutarPreventivoHandler}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg"
        >
          {loading ? "Evaluando..." : "Ejecutar evaluación"}
        </button>
      </div>

      {/* 🔹 RESULTADOS */}
      {resultado?.length > 0 && (
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <h2 className="font-semibold">
            Órdenes generadas
          </h2>

          {resultado.map((r) => (
            <div
              key={r.planId}
              className="bg-green-100 text-green-800 p-2 rounded text-sm"
            >
              Plan #{r.planId} → Orden #{r.orden?.id}
              <br />
              Días desde última ejecución:{" "}
              {Math.floor(r.diasDesdeUltimaEjecucion)}
            </div>
          ))}
        </div>
      )}
      {resultado?.length === 0 && !loading && (
        <div className="bg-gray-100 p-3 rounded text-gray-700 text-sm">
          No se generaron órdenes de mantenimiento.
          <br />
          Todos los planes están al día.
        </div>
)}
    </div>
  );
}