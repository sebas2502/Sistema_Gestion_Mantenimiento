import { useEffect, useState } from "react";
import { obtenerActivos } from "../api/activos";

export default function BuscadorActivo({ onSelect }) {
  const [busqueda, setBusqueda] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [activos, setActivos] = useState([]);
  const [loading, setLoading] = useState(false);

  // cargamos todos una vez
  useEffect(() => {
    cargarActivos();
  }, []);

  const cargarActivos = async () => {
    try {
      setLoading(true);

      const res = await obtenerActivos();

      console.log("ACTIVOS:", res.data);

      setActivos(res.data.data || res.data);

    } catch (error) {
      console.error("ERROR ACTIVOS:", error);
      alert("Error al cargar activos");
    } finally {
      setLoading(false);
    }
  };

  //filtro en frontend
  const filtrados = activos.filter((a) =>
    `${a.nombre} ${a.codigo}`
      .toLowerCase()
      .includes(busqueda.toLowerCase())
  );

  const seleccionar = (activo) => {
    onSelect(activo);
    setBusqueda(`${activo.nombre} (${activo.codigo})`);
    setMostrar(false);
  };

  return (
    <div className="relative w-full">

    
      <input
        type="text"
        placeholder="Buscar activo por nombre o código..."
        className="w-full border p-2 rounded"
        value={busqueda}
        onChange={(e) => {
          setBusqueda(e.target.value);
          setMostrar(true);
        }}
        onFocus={() => setMostrar(true)}
      />

      {/* LISTA */}
      {mostrar && (
        <div className="absolute z-50 bg-white border rounded mt-1 w-full max-h-60 overflow-y-auto shadow">

          {loading && (
            <p className="p-2 text-sm text-gray-500">
              Cargando activos...
            </p>
          )}

          {!loading && filtrados.length > 0 && (
            filtrados.map((a) => (
              <div
                key={a.id}
                onClick={() => seleccionar(a)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                <p className="font-medium">{a.nombre}</p>
                <p className="text-sm text-gray-500">{a.codigo}</p>
              </div>
            ))
          )}

          {!loading && filtrados.length === 0 && busqueda && (
            <p className="p-2 text-sm text-gray-500">
              No se encontraron resultados
            </p>
          )}
        </div>
      )}
    </div>
  );
}