import { BrowserRouter, Route, Routes } from 'react-router'
import Reports from './pages/Reports'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
function App() {
  return (
 <BrowserRouter>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
