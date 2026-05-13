import { useState } from "react";
import ListaOrdenes from "../components/ListaOrdenes";
import DetalleOrden from "../components/DetalleOrden";

export default function Ordenes() {
  const [ordenId, setOrdenId] = useState(null);

  return (
    <div className="p-4">
      <ListaOrdenes onSelect={setOrdenId} />
      <DetalleOrden ordenId={ordenId} />
    </div>
  );
}