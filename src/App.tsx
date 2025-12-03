import { Suspense, useState } from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './routes/ProtectedRoute'
import Test from './pages/test/test'
import Dashboard from './pages/dashboard/dashboard'
import Profile from './pages/profile/profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Suspense fallback={<h2>Loading...</h2>}>
      <Routes>

        {/* Redirect từ /home sang / */}
        <Route path="/home" element={<Navigate to="/" />} />

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Test />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />

        </Route>

        

      </Routes>
    </Suspense>
  </BrowserRouter>
  )
}

export default App
