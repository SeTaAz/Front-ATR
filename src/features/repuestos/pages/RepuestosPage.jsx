import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import RepuestosComponent from "../components/RepuestosComponent";

export default function RepuestosPage() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="repuestos" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <RepuestosComponent />
      </div>
    </div>
  );
}
