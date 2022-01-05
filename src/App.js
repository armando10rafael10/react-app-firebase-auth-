import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import NotFoundPage from './Pages/NotFoundPage';
import ForgetPassword from './Pages/ForgetPassword';
import UpdatePassword from './Pages/UpdatePassword';
import UpdateEmail from './Pages/UpdateEmail';
import UpdateUserProfile from './Pages/UpdateUserProfile';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} index/> 
        <Route path="/Sign-In" element={<SignIn />} /> 
        <Route path="/Home" element={<Home />} />
        <Route path="/Sign-Up" element={<SignUp />} />
        <Route path="/Forget-Password" element={<ForgetPassword />} />
        <Route path="/Update-Password" element={<UpdatePassword />} />
        <Route path="/Update-Email" element={<UpdateEmail />} />
        <Route path="/Update-User-Profile" element={<UpdateUserProfile />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}