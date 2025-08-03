import { useState, useEffect  } from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { loadFromStorage } from './Slices/userSlice';

import Home from './Pages/Home';
import Unauthorized_user from './Pages/UnauthorizesAccess';
import EmployeeUser from './Pages/EmployeeUser';
import Login from './Pages/Login';
import ClientUser from './Pages/ClientUser';



function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);


  return (
    <>

      <Routes>
        {/* Public Routes (Available to Everyone) */}
        <Route path="/" element={<Home />} />
        <Route path="/employee-signup" element={<EmployeeUser />} />
        <Route path="/client-signup" element={<ClientUser />} />
        <Route path="/login" element={<Login />} />


        {/* Unauthorized Route */}
        <Route path="/*" element={<Unauthorized_user />} />



      </Routes>
    </>
  )
}

export default App
