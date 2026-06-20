import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Incidencias from "../pages/Incidencias";
import Analisis from "../pages/Analisis";
import Preventivo from "../pages/Preventivo";
import Dashboard from "../pages/Dashboard";
import Ordenes from "../pages/Ordenes";
import RegistroActivo from "../components/RegistroActivo";
import CrearPlanMantenimiento from "../components/CrearPlan";
import RegistrarUsuario from "../components/RegistroUsuario";
import DetalleOrdenTrabajo from "../pages/DetalleOrden";
import HistorialMantenimiento from "../pages/HistorialMantenimiento";
import Activos from "../pages/Activos";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
       
          <Route path="/incidencias" element={<Incidencias />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/planes" element={<Preventivo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/ordenes" element={<Ordenes />} />
          <Route path="/registrarActivo" element={<RegistroActivo />} />
          <Route path="/crearPlan" element={<CrearPlanMantenimiento />} />
          <Route path="/registrarUsuario" element={<RegistrarUsuario />} />
          <Route path="/detalleOrden" element={<DetalleOrdenTrabajo />} />
          <Route path="/historialMantenimiento" element={<HistorialMantenimiento />} />
          <Route path="/activos" element={<Activos />} />

        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}