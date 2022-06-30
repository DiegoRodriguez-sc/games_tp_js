import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import socketReducer from "./reducers/socketReducer";

export default configureStore({
  reducer: {
    auth: authReducer,
    socket:socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
