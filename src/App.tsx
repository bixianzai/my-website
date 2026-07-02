import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import DashboardHome from './pages/dashboard/DashboardHome'
import ChatPage from './pages/dashboard/ChatPage'
import GoalsPage from './pages/dashboard/GoalsPage'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename="/studypal">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="goals" element={<GoalsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
