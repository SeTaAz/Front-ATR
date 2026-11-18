import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import HojaDeVidaComponent from "../components/HojaDeVidaComponent";

const HojaDeVidaPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="hojaVida" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <HojaDeVidaComponent />
      </div>
    </div>
  )
}

export default HojaDeVidaPage
