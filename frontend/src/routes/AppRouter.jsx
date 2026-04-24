import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Incidencias from "../pages/Incidencias";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
       
          <Route path="/incidencias" element={<Incidencias />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}