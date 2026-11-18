import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import EntradasComponent from "../components/EntradasComponent";

const EntradasPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="entradas" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <EntradasComponent />
      </div>
    </div>
  )
}

export default EntradasPage
