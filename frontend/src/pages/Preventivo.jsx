import { useEffect, useState } from "react";

import BuscadorActivo from "../components/BuscarActivo";

import {
  obtenerPlanes,
  ejecutarPlanes,
} from "../api/planes";

export default function Preventivo() {

  const [activoSeleccionado, setActivoSeleccionado] =
    useState(null);

  const [planes, setPlanes] =
    useState([]);

  const [resultado, setResultado] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const [loadingPlanes, setLoadingPlanes] =
    useState(false);

  // =========================
  // 🔹 CARGAR PLANES
  // =========================
  useEffect(() => {
    cargarPlanes();
  }, []);

  const cargarPlanes = async () => {

    try {

      setLoadingPlanes(true);

      const data =
        await obtenerPlanes();

      console.log(
        "PLANES:",
        data
      );

      setPlanes(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        "ERROR PLANES:",
        error
      );

      alert(
        "Error al cargar planes"
      );

    } finally {

      setLoadingPlanes(false);
    }
  };

  // =========================
  // 🔹 FILTRADO
  // =========================
  const planesFiltrados =
    activoSeleccionado
      ? (planes || []).filter(
          (p) =>
            p.activo?.id ===
            activoSeleccionado.id
        )
      : planes || [];

  // =========================
  // 🔹 CALCULAR DÍAS
  // =========================
  const calcularDias = (fecha) => {

    if (!fecha) return null;

    const hoy = new Date();

    const ultima =
      new Date(fecha);

    return Math.floor(
      (hoy - ultima) /
      (1000 * 60 * 60 * 24)
    );
  };

  // =========================
  // 🔹 EJECUTAR PREVENTIVOS
  // =========================
  const ejecutarPreventivoHandler =
    async () => {

      if (
        !window.confirm(
          "¿Ejecutar evaluación de planes preventivos?"
        )
      ) return;

      try {

        setLoading(true);

        const response =
          await ejecutarPlanes();

        console.log(
          "RESULTADO:",
          response
        );

        // 🔥 el backend devuelve:
        // { message, data }

        setResultado(
          response?.data || []
        );

        // 🔥 refrescar planes
        await cargarPlanes();

      } catch (error) {

        console.error(
          "ERROR PREVENTIVO:",
          error
        );

        alert(
          "Error al ejecutar preventivos"
        );

      } finally {

        setLoading(false);
      }
    };

  return (
    <div className="max-w-5xl mx-auto space-y-6">

      {/* ========================= */}
      {/* HEADER */}
      {/* ========================= */}

      <div>

        <h1 className="text-3xl font-bold text-gray-800">
          Mantenimiento Preventivo
        </h1>

        <p className="text-gray-500 mt-2">
          Gestión y ejecución automática
          de planes preventivos.
        </p>
      </div>

      {/* ========================= */}
      {/* FILTRO */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-5 space-y-3">

        <label className="text-sm text-gray-600">
          Filtrar por activo
        </label>

        <BuscadorActivo
          onSelect={
            setActivoSeleccionado
          }
        />

        {activoSeleccionado && (

          <div className="bg-gray-100 p-3 rounded-xl text-sm">

            <p className="font-medium">
              {
                activoSeleccionado.nombre
              }
            </p>

            <p className="text-gray-500">
              Código:
              {" "}
              {
                activoSeleccionado.codigo
              }
            </p>
          </div>
        )}
      </div>

      {/* ========================= */}
      {/* PLANES */}
      {/* ========================= */}

      <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">

        <div className="flex justify-between items-center">

          <h2 className="text-lg font-semibold">
            Planes registrados
          </h2>

          <button
            onClick={
              ejecutarPreventivoHandler
            }
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-4 py-2 rounded-xl transition"
          >
            {
              loading
                ? "Evaluando..."
                : "Ejecutar preventivos"
            }
          </button>
        </div>

        {loadingPlanes && (

          <p className="text-gray-500 text-sm">
            Cargando planes...
          </p>
        )}

        {!loadingPlanes &&
          planesFiltrados.length === 0 && (

            <div className="bg-gray-100 p-4 rounded-xl text-gray-600 text-sm">

              No hay planes registrados
            </div>
          )}

        <div className="space-y-4">

          {planesFiltrados.map(
            (plan) => {

              const dias =
                calcularDias(
                  plan.fechaUltimaEjecucion
                );

              const vencido =
                dias === null
                  ? true
                  : dias >=
                    Number(
                      plan.frecuenciaDias
                    );

              return (

                <div
                  key={plan.id}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <h3 className="font-semibold text-lg">
                        {
                          plan.descripcion
                        }
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Activo:
                        {" "}
                        {
                          plan.activo?.nombre
                        }
                      </p>

                      <p className="text-sm text-gray-500">
                        Estado:
                        {" "}
                        {
                          plan.estaActivo
                            ? "Activo"
                            : "Inactivo"
                        }
                      </p>
                    </div>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        vencido
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {
                        vencido
                          ? "Pendiente"
                          : "Al día"
                      }
                    </span>
                  </div>

                  {/* KPIs */}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

                    <div className="bg-gray-100 p-3 rounded-xl">

                      <p className="text-xs text-gray-500">
                        Frecuencia
                      </p>

                      <p className="font-bold text-lg">
                        {
                          plan.frecuenciaDias
                        } días
                      </p>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-xl">

                      <p className="text-xs text-gray-500">
                        Última ejecución
                      </p>

                      <p className="font-bold text-sm">

                        {
                          plan.fechaUltimaEjecucion
                            ? new Date(
                                plan.fechaUltimaEjecucion
                              ).toLocaleDateString()
                            : "Nunca ejecutado"
                        }
                      </p>
                    </div>

                    <div className="bg-gray-100 p-3 rounded-xl">

                      <p className="text-xs text-gray-500">
                        Tareas
                      </p>

                      <p className="font-bold text-lg">
                        {
                          plan.tareas?.length || 0
                        }
                      </p>
                    </div>
                  </div>

                  {/* TAREAS */}

                  {plan.tareas?.length > 0 && (

                    <div className="mt-5 space-y-2">

                      <p className="text-sm font-medium text-gray-700">
                        Tareas del plan
                      </p>

                      {plan.tareas.map(
                        (tarea) => (

                          <div
                            key={tarea.id}
                            className="bg-gray-50 border rounded-xl p-3 text-sm"
                          >
                            • {
                              tarea.descripcion
                            }
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </div>

      {/* ========================= */}
      {/* RESULTADOS */}
      {/* ========================= */}

      {resultado.length > 0 && (

        <div className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">

          <h2 className="text-lg font-semibold">
            Órdenes generadas
          </h2>

          {resultado.map((r) => (

            <div
              key={r.planId}
              className="bg-green-100 text-green-800 p-4 rounded-xl"
            >

              <p className="font-medium">
                Plan #{r.planId}
              </p>

              <p className="text-sm mt-1">
                Orden generada:
                {" "}
                #{r.ordenId}
              </p>

              <p className="text-sm">
                Activo:
                {" "}
                {r.activo}
              </p>

              <p className="text-sm">
                Días desde última ejecución:
                {" "}
                {
                  r.diasDesdeUltimaEjecucion
                  
                } {console.log(r)}
              </p>
            </div>
          ))}
        </div>
      )}

      {!loading &&
        resultado.length === 0 && (

          <div className="bg-gray-100 p-4 rounded-xl text-gray-700">

            No se generaron órdenes.
            <br />

            Todos los planes están al día.
          </div>
        )}
    </div>
  );
}