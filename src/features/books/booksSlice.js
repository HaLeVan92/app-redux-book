import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  page: 1,
  total: 10,
  bookDetail: undefined,
};

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    updateBooks: (state, action) => {
      state.data = action.payload;
    },
    updatePage: (state, action) => {
      state.page = action.payload;
    },
    updateBookDetail: (state, action) => {
      state.bookDetail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateBooks, updatePage, updateBookDetail } = booksSlice.actions;

export default booksSlice.reducer;
