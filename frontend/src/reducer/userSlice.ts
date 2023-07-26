import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { login, signupUser } from "./api";
import { message } from "antd";
import { AxiosInstance } from "axios";

export interface User {
  userName: string;
  email: string;
  password: string;
  organisation: string;
  token?: string;
}

interface UserState {
  data: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signupStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signupSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    signupFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.data = action.payload;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const signupUserAsync =
  (userData: User) => async (dispatch: AppDispatch) => {
    try {
      dispatch(signupStart());
      const response = await signupUser(userData);
      dispatch(signupSuccess(response));
      message.success("Sign up successfully!");
    } catch (error: any) {
      dispatch(signupFailure(error.message));
      message.error("Recheck the values!");
    }
  };

export const loginUserAsync =
  (userData: { userName: string; password: string }, instance: AxiosInstance) =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(loginStart());
      const response = await login(userData, instance);

      const userWithToken: User = {
        ...response,
        token: response.token,
      };
      dispatch(loginSuccess(userWithToken));

      message.success("Logged in successfully!");
    } catch (error: any) {
      dispatch(loginFailure(error.message));

      message.error("Invalid credentials!");
    }
  };

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
