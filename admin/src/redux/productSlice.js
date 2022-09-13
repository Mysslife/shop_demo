import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    // GET ALL:
    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.products = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // DELETE PRODUCT:
    deleteProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    deleteProductSuccess: (state, action) => {
      state.products.splice(
        state.products.findIndex((item) => item._id === action.payload),
        1
      );
      state.isFetching = false;
      state.error = false;
    },
    deleteProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // UPDATE PRODUCT:
    updateProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    updateProductSuccess: (state, action) => {
      //action: {product: res.date, id}
      state.isFetching = false;
      state.products[
        state.products.findIndex((item) => item._id === action.payload.id)
      ] = action.payload.product;
      state.error = false;
    },
    updateProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    // ADD PRODUCT:
    addProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    addProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products.push(action.payload);
      state.error = false;
    },
    addProductFailed: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const {
  getProductStart,
  getProductSuccess,
  getProductFailed,
  deleteProductStart,
  deleteProductSuccess,
  deleteProductFailed,
  updateProductStart,
  updateProductSuccess,
  updateProductFailed,
  addProductStart,
  addProductSuccess,
  addProductFailed,
} = productSlice.actions;
export default productSlice.reducer;
