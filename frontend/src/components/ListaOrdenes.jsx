import { useEffect, useState } from "react";
import { obtenerOrdenes } from "../api/ordenes";

export default function ListaOrdenes({ onSelect }) {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    const data = await obtenerOrdenes();
    setOrdenes(data);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Órdenes de Trabajo</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Activo</th>
            <th>Tipo</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {ordenes.map((o) => (
            <tr key={o.id} className="text-center border-t">
              <td>{o.id}</td>
              <td>{o.activo?.nombre}</td>
              <td>{o.tipo}</td>

              <td>
                <span
                  className={
                    o.estado === "FINALIZADA"
                      ? "text-green-600"
                      : o.estado === "PENDIENTE"
                      ? "text-gray-500"
                      : "text-yellow-500"
                  }
                >
                  {o.estado}
                </span>
              </td>

              <td>
                <button
                  onClick={() => onSelect(o.id)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}