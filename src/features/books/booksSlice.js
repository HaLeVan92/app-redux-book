import { createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";

const initialState = {
  loading: false,
  data: [],
  page: 1,
  total: 10,
  bookDetail: undefined,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    isLoading: (state) => {
      state.loading = true;
      state.errorMessage = "";
    },
    hasError: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    updateBooks: (state, action) => {
      state.data = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateBookDetail: (state, action) => {
      state.bookDetail = action.payload;
    },
    getBookSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateBooks,
  updatePage,
  updateBookDetail,
  getBookSuccess,
  isLoading,
  hasError,
} = booksSlice.actions;

export const getBooks = (pageNum, limit, query) => async (dispatch) => {
  try {
    dispatch(isLoading());
    let url = `/books?_page=${pageNum}&_limit=${limit}`;
    if (query) url += `&q=${query}`;
    const data = await api.get(url);
    console.log(data);
    dispatch(getBookSuccess(data.data));
    console.log("data", data);
  } catch (error) {
    dispatch(hasError(error.message));
    console.log(error);
  }
};

export default booksSlice.reducer;
