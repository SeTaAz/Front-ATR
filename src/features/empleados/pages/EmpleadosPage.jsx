import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import EmpleadosComponent from "../components/EmpleadosComponent";

const EmpleadosPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="empleados" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <EmpleadosComponent />
      </div>
    </div>
  )
}

export default EmpleadosPage
