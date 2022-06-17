import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingScreen from "../pages/LandingScreen";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
