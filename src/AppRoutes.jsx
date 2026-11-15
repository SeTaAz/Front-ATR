import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AgendaPage from "./features/agenda/pages/AgendaPage";
import ClientesPage from "./features/clientes/pages/ClientesPage";
import DashboardPage from "./features/dashboard/pages/DashboardPage";
import EmpleadosPage from "./features/empleados/pages/EmpleadosPage";
import EntradasPage from "./features/entradas/pages/EntradasPage";
import GarantiasPage from "./features/garantias/pages/GarantiasPage";
import HojaDeVidaPage from "./features/hoja-de-vida/pages/HojaDeVidaPage";
import LoginPage from "./features/login/pages/LoginPage";
import RepuestosPage from "./features/repuestos/pages/RepuestosPage";
import RolesPage from "./features/roles/pages/RolesPage";
import UsuariosPage from "./features/usuarios/pages/UsuariosPage";
import VentasPage from "./features/ventas/pages/VentasPage";

// La landing (motion + SVG) se carga en un chunk aparte para no engordar el bundle principal.
const LandingPage = lazy(() => import("./features/landing/pages/LandingPage"));

const CargandoLanding = () => (
  <div
    role="status"
    aria-live="polite"
    className="flex min-h-screen items-center justify-center bg-verde-claro text-sm font-semibold text-verde-oscuro"
  >
    Cargando...
  </div>
);

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<CargandoLanding />}>
              <LandingPage />
            </Suspense>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/roles" element={<RolesPage />} />
        <Route path="/usuarios" element={<UsuariosPage />} />
        <Route path="/repuestos" element={<RepuestosPage />} />
        <Route path="/agenda" element={<AgendaPage />} />
        <Route path="/ventas" element={<VentasPage />} />
        <Route path="/hojaVida" element={<HojaDeVidaPage />} />
        <Route path="/clientes" element={<ClientesPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/empleados" element={<EmpleadosPage />} />
        <Route path="/entradas" element={<EntradasPage />} />
        <Route path="/garantias" element={<GarantiasPage />} />

      </Routes>
    </BrowserRouter>
  );
}
