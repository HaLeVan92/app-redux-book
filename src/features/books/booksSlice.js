import { createSlice } from "@reduxjs/toolkit";
import api from "../../apiService";
import { toast } from "react-toastify";

const initialState = {
  loading: false,
  data: [],
  page: 1,
  total: 10,
  bookDetail: undefined,
  addingBook: false,
  errorMessage: "",
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
    getBookDetailSuccess: (state, action) => {
      state.loading = false;
      state.errorMessage = "";
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
  getBookDetailSuccess,
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
export const getAddingBook = (addingBook) => async (dispatch) => {
  try {
    await api.post(`/favorites`, addingBook);
    toast.success("The book has been added to the reading list!");
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};
export const getBookDetail = (bookId) => async (dispatch) => {
  try {
    dispatch(isLoading());
    const res = await api.get(`/books/${bookId}`);
    const data = res.data;
    dispatch(getBookDetailSuccess(data));
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
};
export default booksSlice.reducer;
