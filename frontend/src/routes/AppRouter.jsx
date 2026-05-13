import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Incidencias from "../pages/Incidencias";
import Analisis from "../pages/Analisis";
import Preventivo from "../pages/Preventivo";
import Dashboard from "../pages/Dashboard";
import Ordenes from "../pages/Ordenes";

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
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}