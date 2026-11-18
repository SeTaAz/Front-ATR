import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import GarantiasComponent from "../components/GarantiasComponent";

const GarantiasPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="garantias" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <GarantiasComponent />
      </div>
    </div>
  )
}

export default GarantiasPage
