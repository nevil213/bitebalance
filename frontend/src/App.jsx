import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header.jsx';
import NotFound from './pages/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginDialog from './components/RegisterDialog';
import HomePage from './components/HomePage';
import Register from './pages/Register';
import Footer from './components/Footer';
import StaffDashboard from './pages/StaffDashboard';

function App() {

  const [isLoggedIn, setisLoggedIn] = useState(1)

  return (

    <BrowserRouter>
    <Header/>
    <Routes>
    <Route path="/" element={isLoggedIn?<HomePage />:<Register/>} />
    <Route path="*" element={<NotFound />} />
    <Route path="/dashboard" element={<StaffDashboard />} />
    {/* <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <CustomerRegister />} /> */}

    </Routes>
    <Footer/>
  </BrowserRouter>
  )
}

export default App
