import Sidebar from "../../../shared/components/Sidebar";
import DashboardHeader from "../../dashboard/components/DashboardHeader";
import ClientesComponent from "../components/ClientesComponent";

const ClientesPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="clientes" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <ClientesComponent />
      </div>
    </div>
  )
}

export default ClientesPage
