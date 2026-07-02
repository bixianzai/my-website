import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/dashboard/Sidebar'

export default function DashboardLayout() {
  return (
    <div className="min-h-svh flex">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950">
        <Outlet />
      </main>
    </div>
  )
}
