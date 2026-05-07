import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom'
import Farms from './components/farms/Farms'
import Farmers from './components/farmers/Farmers'

function App() {
  return (
    <BrowserRouter>
      <>
        <nav className="flex gap-4 p-4 border-b">
          <Link to="/farms" className="text-blue-600 hover:underline">
            Farms
          </Link>
          <Link to="/farmers" className="text-blue-600 hover:underline">
            Farmers
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Navigate to="/farms" replace />} />
          <Route path="/farms" element={<Farms />} />
          <Route path="/farmers" element={<Farmers />} />
        </Routes>
      </>
    </BrowserRouter>
  )
}

export default App
