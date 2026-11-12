import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./features/landing/pages/LandingPage";
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

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
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
