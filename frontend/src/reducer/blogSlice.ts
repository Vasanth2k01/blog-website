import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./store";
import { message } from "antd";
import { getBlog } from "./api";
import { blogMessage } from "../utils/constants";

export interface Blog {
  blogId: string;
  title: string;
  content: string;
  author: string;
}
export interface BlogData {
  blogId: string;
  title: string;
  content: string;
  author: string;
}

interface BlogState {
  data: Blog[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  data: null,
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    getBlogSuccess: (state, action: PayloadAction<Blog[]>) => {
      state.loading = true;
      state.data = action.payload;
      state.error = null;
    },
    getBlogFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getBlogsAsync = () => async (dispatch: AppDispatch) => {
  try {
    const response = await getBlog();
    dispatch(getBlogSuccess(response));
  } catch (error: any) {
    dispatch(getBlogFailure(error.message));
    message.error(blogMessage.ERROR);
  }
};

export const { getBlogSuccess, getBlogFailure } = blogSlice.actions;

export default blogSlice.reducer;
