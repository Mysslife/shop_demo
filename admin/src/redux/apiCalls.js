import { publicRequest, userRequest } from "../requestMethods";
import { loginStart, loginSuccess, loginFailed, logout } from "./userSlice";
import {
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
} from "./productSlice";

import {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailed,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
  addUserStart,
  addUserSuccess,
  addUserFailed,
} from "./userListSlice";

// ==================================== LOGIN and LOGOUT CURRENT USER:
// GET LOGIN USER:
export const login = async (dispatch, user) => {
  dispatch(loginStart());

  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailed());
  }
};

export const logoutFunction = (dispatch) => {
  dispatch(logout());
};

// ==================================== PRODUCTS:
// GET ALL PRODUCTS:
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailed());
  }
};

// DELETE ONE PRODUCT:
export const deleteProduct = async (dispatch, id) => {
  dispatch(deleteProductStart());

  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailed());
  }
};

// UPDATE ONE PRODUCT:
export const updateProduct = async (dispatch, id, newInfo) => {
  dispatch(updateProductStart());

  try {
    const res = await userRequest.put(`/products/${id}`, newInfo);
    dispatch(updateProductSuccess({ product: res.data, id }));
  } catch (err) {
    dispatch(updateProductFailed());
  }
};

// ADD ONE PRODUCT:
export const addProduct = async (dispatch, product) => {
  dispatch(addProductStart());

  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailed());
  }
};

// ==================================== USERS LIST:
// GET ALL USERS:
export const getUserList = async (dispatch) => {
  dispatch(getUserStart());

  try {
    const res = await userRequest.get("/users");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailed());
  }
};

// DELETE ONE USER:
export const deleteUser = async (dispatch, id) => {
  dispatch(deleteUserStart());

  try {
    const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteUserSuccess(id));
  } catch (err) {
    dispatch(deleteUserFailed());
  }
};

// UPDATE ONE USER:
export const updateUser = async (dispatch, id, user) => {
  dispatch(updateUserStart());

  try {
    const res = await userRequest.put(`/users/${id}`, user);
    dispatch(updateUserSuccess({ user: res.data, id }));
  } catch (err) {
    dispatch(updateUserFailed());
  }
};

// ADD ONE USER:
export const addUser = async (dispatch, user) => {
  dispatch(addUserStart());

  try {
    const res = await userRequest.post(`/auth/register`, user);
    dispatch(addUserSuccess(res.data));
  } catch (err) {
    dispatch(addUserFailed());
  }
};
