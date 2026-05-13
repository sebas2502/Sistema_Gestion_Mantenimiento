import { useEffect, useState } from "react";
import { obtenerOrden, completarDetalle } from "../api/ordenes";

export default function DetalleOrden({ ordenId }) {
  const [orden, setOrden] = useState(null);

  useEffect(() => {
    if (ordenId) cargar();
  }, [ordenId]);

  const cargar = async () => {
    const data = await obtenerOrden(ordenId);
    setOrden(data);
  };

  const toggle = async (detalleId) => {
    await completarDetalle(detalleId);
    cargar(); // 🔥 refresca estado
  };

  if (!orden) return <p>Seleccioná una orden</p>;

  const total = orden.detalles.length;
  const completas = orden.detalles.filter(d => d.completado).length;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold">
        Orden #{orden.id} - {orden.tipo}
      </h3>

      <p>Activo: {orden.activo?.nombre}</p>
      <p>Estado: {orden.estado}</p>

      {/* 🔥 progreso */}
      <div className="my-2">
        <div className="bg-gray-300 h-3 rounded">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${(completas / total) * 100}%` }}
          />
        </div>
        <p className="text-sm">
          {completas}/{total} tareas completadas
        </p>
      </div>

      <ul className="mt-4">
        {orden.detalles.map((d) => (
          <li key={d.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={d.completado}
              onChange={() => toggle(d.id)}
            />
            <span
              className={d.completado ? "line-through text-gray-400" : ""}
            >
              {d.descripcion}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}