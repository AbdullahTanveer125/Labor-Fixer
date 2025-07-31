import { useState } from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';

import Unauthorized_user from './Pages/UnauthorizesAccess';
import EmployeeUser from './Pages/EmployeeUser';
import Login from './Pages/Login';



function App() {


  return (
    <>

      <Routes>
        {/* Public Routes (Available to Everyone) */}
        <Route path="/" element={<Home />} />
        <Route path="/employee-signup" element={<EmployeeUser />} />
        <Route path="/login" element={<Login />} />
        

        {/* Unauthorized Route */}
        <Route path="/*" element={<Unauthorized_user />} />



      </Routes>
    </>
  )
}

export default App
