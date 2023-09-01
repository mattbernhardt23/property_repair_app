import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import authReducer from "@features/auth/authSlice";
import projectReducer from "@features/projects/projectSlice";

export const store = configureStore(
  {
    reducer: {
      auth: authReducer,
      projectData: projectReducer,
    },
  },
  applyMiddleware(thunkMiddleware)
);
