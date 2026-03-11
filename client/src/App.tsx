import { BrowserRouter, Link, Route, Routes } from 'react-router'
import './App.css'

import Login from './pages/Login'
function App() {
  return (
 <BrowserRouter>
      {/* Navigation */}
      <nav>
        <h1>Agents Reports System</h1>
        <Link to="/">Home</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/movie/:id" element={<Details />} />
        <Route path="/movie/seats/:id" element={<Seats />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
