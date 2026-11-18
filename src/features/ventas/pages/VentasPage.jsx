import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import VentasComponent from "../components/VentasComponent";

const VentasPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="ventas" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <VentasComponent />
      </div>
    </div>
  )
}

export default VentasPage
