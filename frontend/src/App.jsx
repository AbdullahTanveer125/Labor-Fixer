import { useState, useEffect  } from 'react'
import './App.css'

import { Routes, Route } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { loadFromStorage } from './Slices/userSlice';

import Home from './Pages/Home';
import Unauthorized_user from './Pages/UnauthorizesAccess';
import EmployeeUser from './Pages/EmployeeUser';

import ClientUser from './Pages/ClientUser';
import EmployeLandingPage from './Pages/EmployeLandingPage';
import ClientLandingPage from './Pages/ClientLandingPage';
import PostJob from './Pages/PostJob';
import ClientLoginPage from './Pages/ClientLoginPage';



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
        <Route path="/client-login" element={<ClientLoginPage />} />
        <Route path="/employee" element={<EmployeLandingPage />} />
        <Route path="/client" element={<ClientLandingPage />} />
        <Route path="/post-job" element={<PostJob />} />


        {/* Unauthorized Route */}
        <Route path="/*" element={<Unauthorized_user />} />



      </Routes>
    </>
  )
}

export default App
