import React from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import DashboardScreen from "../pages/DashboardScreen";
import LandingScreen from "../pages/LandingScreen";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import { useSnackbar } from "notistack";
import { notistack } from "../redux/reducers/authReducer";

const AppRouter = () => {

  const { enqueueSnackbar } = useSnackbar();
  let navigate = useNavigate();
  notistack(enqueueSnackbar, navigate);

  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<LandingScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />

        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
