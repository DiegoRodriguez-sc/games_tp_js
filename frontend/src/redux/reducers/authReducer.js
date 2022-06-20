import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  serviceLogin,
  serviceRegister,
  serviceRevalidation,
} from "../../services/auth.service";

let snack = "";
let naviga;
export const notistack = (notify) => {
  snack = notify;
};
export const navig = (n) => {
    naviga = n;
}

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
  reducers: {
    setLogout: (state) => {
      localStorage.removeItem("token");
      state.logged = false;
      state.user = [];
      state.token = null;
      state.error = null;
      state.online = false;
    }
  },
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
        const message = action.payload.error.msg;
        snack(message, {
          variant: "error",
        });
        state.logged = false;
      } else {
        state.token = action.payload.resp.data.token;
        state.user = action.payload.resp.data.user;
        state.logged = true;
        state.error = null;
        localStorage.setItem("token", action.payload.resp.data.token);
        const message = `Bienvenido ${action.payload.resp.data.user.name}`;
        snack(message, {
          variant: "success",
        });
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
      console.log(action.payload);
      if (action.payload.error) {
        const message = action.payload.error.msg;
        snack(message, {
          variant: "error",
        });
      } else {
        const message = action.payload.resp.msg;
        snack(message, {
          variant: "success",
        });
        naviga("/login");
        const message2 = "Inicia sesion con tu nueva cuenta!!";
        snack(message2, {
          variant: "info",
        });
      }
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
export const { setLogout } = authSlice.actions;
