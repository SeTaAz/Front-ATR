import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import UsuariosComponent from "../components/UsuariosComponent";

export default function UsuariosPage() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="users" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <UsuariosComponent />
      </div>
    </div>
  );
}
