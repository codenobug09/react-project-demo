import { Suspense, useState } from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './routes/ProtectedRoute'
import Test from './pages/test/test'
import Dashboard from './pages/dashboard/dashboard'

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

          <Route path="login" element={<Dashboard />} />

          {/* Protected route */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
              </ProtectedRoute>
            }
          />
        </Route>

        

      </Routes>
    </Suspense>
  </BrowserRouter>
  )
}

export default App
