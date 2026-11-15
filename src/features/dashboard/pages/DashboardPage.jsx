import React from 'react'
import Sidebar from '../../../shared/components/Sidebar'
import DashboardComponent from '../components/DashboardComponent'

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 md:flex">
      <Sidebar currentModule="dashboard" />
      <DashboardComponent />
    </div>
  )
}

export default DashboardPage
