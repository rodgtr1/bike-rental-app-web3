import { useState } from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard';
import OwnerDashboard from './components/owner/OwnerDashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/admin" element={<OwnerDashboard />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
