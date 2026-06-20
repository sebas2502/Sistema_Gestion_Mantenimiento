import { useState } from "react";
import BuscadorActivo from "../components/BuscarActivo";
import { ejecutarAnalisis } from "../api/analisis";

export default function Analisis() {
  const [activoSeleccionado, setActivoSeleccionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);

  const ejecutarAnalisisHandler = async () => {
     
    if (!activoSeleccionado) {
     
      return alert("Seleccioná un activo");
    }

    if (!window.confirm("¿Ejecutar análisis predictivo?")) return;

    try {
      setLoading(true);

      const res = await ejecutarAnalisis(activoSeleccionado.id);
      console.log(res.data)
      setResultado(res.data);

    } catch (error) {
      console.error("ERROR ANALISIS:", error);
      alert("Error al ejecutar análisis");
    } finally {
      setLoading(false);
    }
  };

  const analisis = resultado?.analisis;

// 🔹 Detecta si el activo requiere atención
const requiereAtencion =
  analisis &&
  (
    analisis.mtbf < 50 ||
    analisis.tendencia === "AUMENTO_DE_FALLAS"
  );

// 🔹 Detecta si corresponde generar orden automática
const correspondeOrden =
  analisis &&
  analisis.mtbf < 50 &&
  analisis.tendencia === "AUMENTO_DE_FALLAS";

// 🔹 Detecta si ya existe una orden abierta
const yaExisteOrden =
  correspondeOrden && !resultado?.ordenGenerada;

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      {/* 🔹 TÍTULO */}
      <div>
        <h1 className="text-2xl font-bold">
          Análisis Predictivo
        </h1>
        <p className="text-gray-600 text-sm mt-1">
          Evaluación del comportamiento histórico de los activos para anticipar fallas.
        </p>
      </div>

      {/* 🔹 BUSCADOR */}
      <div className="bg-white p-4 rounded-xl shadow space-y-3">
        <label className="text-sm text-gray-600">
          Buscar activo
        </label>

        <BuscadorActivo onSelect={setActivoSeleccionado} />

        {activoSeleccionado && (
          <div className="bg-gray-100 p-3 rounded text-sm">
            <p className="font-medium">
              {activoSeleccionado.nombre}
            </p>
            <p className="text-gray-500">
              Código: {activoSeleccionado.codigo}
            </p>
          </div>
        )}

        <button
          onClick={ejecutarAnalisisHandler}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
        >
          {loading ? "Ejecutando análisis..." : "Ejecutar análisis"}
        </button>
      </div>

      {/* 🔹 RESULTADOS */}
      {resultado && (
        <div className="bg-white p-5 rounded-xl shadow space-y-4">

          <h2 className="text-lg font-semibold">
            Resultado del análisis
          </h2>

          {/* MÉTRICAS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">MTBF</p>
              <p className="text-xl font-bold">
                {analisis.mtbf} hs
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Frecuencia</p>
              <p className="text-xl font-bold">
                {analisis.frecuenciaFallos}
              </p>
            </div>

            <div className="bg-gray-100 p-3 rounded">
              <p className="text-sm text-gray-500">Tendencia</p>
              <p
                className={`text-xl font-bold ${
                  analisis.tendencia === "AUMENTO"
                    ? "text-red-500"
                    : analisis.tendencia === "MEJORA"
                    ? "text-green-500"
                    : "text-gray-700"
                }`}
              >
                {analisis.tendencia}
              </p>
            </div>
          </div>

          {/* ALERTAS */}
          {resultado.alertas?.length > 0 && (
            <div className="bg-red-50 p-3 rounded">
              <p className="font-medium text-red-600 mb-1">
                Alertas detectadas
              </p>

              {resultado.alertas.map((a) => (
                <p key={a.id} className="text-sm text-red-500">
                  • {a.mensaje}
                </p>
              ))}
            </div>
          )}

         {/* 🔹 RESULTADO FINAL */}

{/* ORDEN GENERADA */}
{resultado.ordenGenerada && (
  <div className="bg-green-100 text-green-800 p-3 rounded">
    Se generó una orden de mantenimiento automáticamente
  </div>
)}

{/* YA EXISTE ORDEN */}
{yaExisteOrden && (
  <div className="bg-yellow-100 text-yellow-800 p-3 rounded">
    Ya existe una orden abierta para este activo
  </div>
)}

{/* REQUIERE ATENCIÓN PERO NO ORDEN */}
{requiereAtencion && !correspondeOrden && (
  <div className="bg-orange-100 text-orange-800 p-3 rounded">
    Se recomienda realizar una inspección preventiva del activo
  </div>
)}

{/* SIN RIESGO */}
{!requiereAtencion && (
  <div className="bg-gray-100 text-gray-700 p-3 rounded">
    No se requiere mantenimiento en este momento
  </div>
)}
        </div>
      )}
    </div>
  );
}