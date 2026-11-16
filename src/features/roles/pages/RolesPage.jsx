import Sidebar from '../../../shared/components/Sidebar';
import DashboardHeader from '../../dashboard/components/DashboardHeader';
import RolesComponent from '../components/RolesComponent';

export default function RolesPage() {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="roles" />
      <div className="min-w-0 flex-1 bg-white">
        <DashboardHeader />
        <RolesComponent />
      </div>
    </div>
  );
}
