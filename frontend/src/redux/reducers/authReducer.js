import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  serviceLogin,
  serviceRegister,
  serviceRevalidation,
} from "../../services/auth.service";

//functions async

export const startLogin = createAsyncThunk("auth/startLogin", async (body) => {
  const respLogin = await serviceLogin(body);
  return respLogin;
});

export const startRegister = createAsyncThunk(
  "auth/startRegister",
  async (body) => {
    const respRegister = await serviceRegister(body);
    return respRegister;
  }
);

export const startRevalidation = createAsyncThunk(
  "auth/startRevalidation",
  async () => {
    const respReva = await serviceRevalidation();
    return respReva;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: [],
    token: null,
    logged: false,
    loading: true,
    online: false,
    error: null,
  },
  reducers: {},
  extraReducers: {
    //login---------------------------------------
    [startLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [startLogin.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload.error) {
        state.error = action.payload.error.msg;
        state.logged = false;
      } else {
        state.token = action.payload.resp.data.token;
        state.user = action.payload.resp.data.user;
        state.logged = true;
        state.error = null;
        localStorage.setItem("token", action.payload.resp.data.token);
      }
      state.loading = false;
    },
    [startLogin.rejected]: (state) => {
      state.error = "error al iniciar sesión trata de recargar la página";
      state.logged = false;
      state.loading = false;
    },
    //Registro---------------------------------------
    [startRegister.pending]: (state) => {
      state.loading = true;
    },
    [startRegister.fulfilled]: (state, action) => {
        console.log(action.payload.resp);
    },
    [startRegister.rejected]: (state, action) => {
      state.error = "error al Registrarse trata de recargar la página ";
      state.logged = false;
      state.loading = false;
    },
    //Revalidation---------------------------------------
    [startRevalidation.pending]: (state) => {
      state.loading = true;
    },
    [startRevalidation.fulfilled]: (state, action) => {
      if (action.payload.error) {
        state.logged = false;
      } else {
        state.token = action.payload.resp.data.token;
        state.user = action.payload.resp.data.user;
        state.logged = true;
        state.error = null;
        localStorage.setItem("token", action.payload.resp.data.token);
      }
      state.loading = false;
    },
    [startRevalidation.rejected]: (state) => {
      state.error = "error al iniciar sesión trata de recargar la página";
      state.logged = false;
      state.loading = false;
    },
  },
});

export default authSlice.reducer;
