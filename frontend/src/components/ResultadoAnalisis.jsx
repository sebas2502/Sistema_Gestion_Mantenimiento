export default function ResultadoAnalisis({ data }) {
  const { analisis, alertas, sugerencias, ordenGenerada, motivoOrden } = data;

  return (
    <div className="mt-6 space-y-4">

      {/* MÉTRICAS */}
      <div className="bg-gray-50 p-4 rounded-xl shadow">
        <h3 className="font-semibold text-lg mb-2 text-gray-800">
          Resultado del Análisis
        </h3>
        <p><span className="font-medium">MTBF:</span> {analisis.mtbf} hs</p>
        <p><span className="font-medium">Frecuencia:</span> {analisis.frecuenciaFallos}</p>
        <p>
          <span className="font-medium">Tendencia:</span>{" "}
          <span className="text-blue-600 font-semibold">
            {analisis.tendencia}
          </span>
        </p>
      </div>

      {/* ALERTAS */}
      <div className="bg-red-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-2 text-red-700">Alertas</h4>

        {alertas.length === 0 ? (
          <p className="text-gray-600">No hay alertas</p>
        ) : (
          <ul className="list-disc ml-5 text-red-600">
            {alertas.map((a) => (
              <li key={a.id}>{a.mensaje}</li>
            ))}
          </ul>
        )}
      </div>

      {/* SUGERENCIAS */}
      <div className="bg-yellow-50 p-4 rounded-xl shadow">
        <h4 className="font-semibold mb-2 text-yellow-700">
          Sugerencias
        </h4>

        {sugerencias.length === 0 ? (
          <p className="text-gray-600">No hay sugerencias</p>
        ) : (
          <ul className="list-disc ml-5 text-yellow-700">
            {sugerencias.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ORDEN AUTOMÁTICA */}

      {motivoOrden === "YA_EXISTE_ORDEN_ABIERTA" && (
        <div className="mt-4 bg-yellow-100 text-yellow-800 p-3 rounded-lg">
                Ya existe una orden de trabajo abierta para este activo
        </div>
        )}  

     {ordenGenerada && (
  <div className="mt-4 bg-green-100 text-green-800 p-3 rounded-lg">
    Orden de trabajo generada correctamente
  </div>
)}
    </div>
  );
}