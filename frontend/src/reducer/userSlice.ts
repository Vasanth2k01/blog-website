import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { login, signupUser } from "./api";
import { message } from "antd";
import { AxiosInstance } from "axios";
import { showMessage } from "../utils/constants";

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
  signupStatus: boolean;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
  signupStatus: false,
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
    setSignupStatus: (state) => {
      state.signupStatus = true;
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
      dispatch(setSignupStatus());
      message.success(showMessage.SIGNUP);
    } catch (error: any) {
      dispatch(signupFailure(error.message));
      message.error(showMessage.EMAIL);
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

      message.success(showMessage.LOGIN);
    } catch (error: any) {
      dispatch(loginFailure(error.message));

      message.error(showMessage.ERROR);
    }
  };

export const {
  signupStart,
  signupSuccess,
  signupFailure,
  loginStart,
  loginSuccess,
  setSignupStatus,
  loginFailure,
} = userSlice.actions;

export default userSlice.reducer;
