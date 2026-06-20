import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    incidencias: [],
    ordenes: [],
    alertas: [],
    planes: [],
    analisis: [],
  });

  useEffect(() => {
    setTimeout(() => {
      setData({
        incidencias: [
          {
            id: 1,
            activo: "Compresor A",
            descripcion: "Fuga hidráulica detectada",
            estado: "PENDIENTE",
          },
          {
            id: 2,
            activo: "Motor B",
            descripcion: "Vibración excesiva",
            estado: "VALIDADA",
          },
        ],

        ordenes: [
          {
            id: 101,
            tipo: "CORRECTIVO",
            estado: "EN_PROCESO",
            activo: "Compresor A",
          },
          {
            id: 102,
            tipo: "PREVENTIVO",
            estado: "PENDIENTE",
            activo: "Motor B",
          },
        ],

        // 🔹 ALERTAS CON ACTIVO ASOCIADO
        alertas: [
          {
            id: 1,
            activo: "Compresor A",
            mensaje: "MTBF bajo detectado",
            nivel: "CRITICO",
          },
          {
            id: 2,
            activo: "Motor B",
            mensaje: "Tendencia negativa de fallas",
            nivel: "ALTO",
          },
        ],

        planes: [
          {
            id: 1,
            activo: "Compresor A",
            frecuencia: 30,
          },
          {
            id: 2,
            activo: "Motor B",
            frecuencia: 15,
          },
        ],

        analisis: [
          {
            id: 1,
            activo: "Compresor A",
            mtbf: 42,
            tendencia: "AUMENTO_DE_FALLAS",
          },
        ],
      });

      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 text-lg">
          Cargando dashboard...
        </p>
      </div>
    );
  }

  // 🔹 KPIs
  const incidenciasPendientes = data.incidencias.filter(
    (i) => i.estado === "PENDIENTE"
  ).length;

  const ordenesActivas = data.ordenes.filter(
    (o) => o.estado !== "FINALIZADA"
  ).length;

  return (
    <div className="space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestión de Mantenimiento
        </h1>

        <p className="text-gray-500 mt-2">
          Supervisión operativa, mantenimiento preventivo y análisis predictivo de activos industriales.
        </p>
      </div>

      {/* ========================= */}
      {/* KPIs */}
      {/* ========================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Incidencias pendientes
          </p>

          <h2 className="text-4xl font-bold text-red-500 mt-2">
            {incidenciasPendientes}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Órdenes activas
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            {ordenesActivas}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Planes preventivos
          </p>

          <h2 className="text-4xl font-bold text-green-500 mt-2">
            {data.planes.length}
          </h2>
        </div>

        <div className="bg-white border rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Alertas predictivas
          </p>

          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            {data.alertas.length}
          </h2>
        </div>
      </div>

      {/* ========================= */}
      {/* CONTENIDO CENTRAL */}
      {/* ========================= */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ALERTAS */}
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">
            Alertas predictivas
          </h2>

          <div className="space-y-3">

            {data.alertas.map((a) => (
              <div
                key={a.id}
                className="border rounded-xl p-3 bg-yellow-50"
              >
                <div className="flex justify-between items-center mb-2">

                  <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                    {a.nivel}
                  </span>
                </div>

                <p className="font-medium text-gray-800">
                  {a.activo}
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {a.mensaje}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* INCIDENCIAS */}
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">
            Incidencias recientes
          </h2>

          <div className="space-y-3">

            {data.incidencias.map((i) => (
              <div
                key={i.id}
                className="border rounded-xl p-3"
              >
                <div className="flex justify-between items-center">

                  <h3 className="font-medium">
                    {i.activo}
                  </h3>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      i.estado === "PENDIENTE"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {i.estado}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {i.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ORDENES */}
        <div className="bg-white border rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold mb-4">
            Órdenes de trabajo
          </h2>

          <div className="space-y-3">

            {data.ordenes.map((o) => (
              <div
                key={o.id}
                className="border rounded-xl p-3"
              >
                <div className="flex justify-between items-center">

                  <h3 className="font-medium">
                    Orden #{o.id}
                  </h3>

                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    {o.tipo}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Activo: {o.activo}
                </p>

                <p className="text-sm text-gray-500">
                  Estado: {o.estado}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================= */}
      {/* ANALISIS PREDICTIVO */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Últimos análisis predictivos
        </h2>

        <div className="space-y-4">

          {data.analisis.map((a) => (
            <div
              key={a.id}
              className="border rounded-xl p-4"
            >
              <div className="flex justify-between items-center">

                <h3 className="font-semibold">
                  {a.activo}
                </h3>

                <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                  {a.tendencia}
                </span>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                MTBF calculado: {a.mtbf} horas
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================= */}
      {/* ACCIONES RAPIDAS */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6">

        <h2 className="text-lg font-semibold mb-4">
          Acciones rápidas
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <Link
            to="/incidencias"
            className="bg-red-500 hover:bg-red-600 text-white text-center py-3 rounded-xl font-medium transition"
          >
            Consultar incidencias
          </Link>

          <Link
            to="/ordenes"
            className="bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-xl font-medium transition"
          >
            Gestionar órdenes
          </Link>

          <Link
            to="/preventivo"
            className="bg-green-500 hover:bg-green-600 text-white text-center py-3 rounded-xl font-medium transition"
          >
            Planes preventivos
          </Link>

          <Link
            to="/analisis"
            className="bg-blue-500 hover:bg-blue-600 text-white text-center py-3 rounded-xl font-medium transition"
          >
            Ejecutar análisis
          </Link>
        </div>
      </div>
    </div>
  );
}