import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import AgendaComponent from "../components/AgendaComponent";

const AgendaPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="agenda" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <AgendaComponent />
      </div>
    </div>
  )
}

export default AgendaPage
