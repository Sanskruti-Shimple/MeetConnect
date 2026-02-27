import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import interviewReducer from "../features/interviews/interviewSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    interviews: interviewReducer,
  },
});