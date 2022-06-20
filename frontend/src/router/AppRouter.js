import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardScreen from "../pages/DashboardScreen";
import LandingScreen from "../pages/LandingScreen";
import LoginScreen from "../pages/LoginScreen";
import RegisterScreen from "../pages/RegisterScreen";
import { useSnackbar } from "notistack";
import { notistack, startRevalidation } from "../redux/reducers/authReducer";
import ProtectPublic from "./ProtectPublic";
import ProtectPrivate from "./ProtectPrivate";
import { useDispatch, useSelector } from "react-redux";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  //notify redux
  const { enqueueSnackbar } = useSnackbar();
  notistack(enqueueSnackbar);

  //revalidation auth
  useEffect(() => {
    dispatch(startRevalidation());
  }, [dispatch]);

  //loading 
  if(loading){
    return(
      <div>Cargando...</div>
    )
  }


  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route path="/" element={<ProtectPublic><LandingScreen/></ProtectPublic>}/>
        <Route path="/login" element={<ProtectPublic><LoginScreen/></ProtectPublic>}/>
        <Route path="/register" element={<ProtectPublic><RegisterScreen/></ProtectPublic>}/>
        {/* private */} 
        <Route path="/dashboard" element={<ProtectPrivate><DashboardScreen/></ProtectPrivate>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
