import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  CHECKAUTH_SUCCESS,
  CHECKAUTH_FAILURE,
  SET_USER,
} from "./types";
import api from "../utils/api";
import { setAlert } from "./alert";
import { FormData } from "../globalTS";

//  I. Register a new User and  add the user to the DB
export const registerUser = (formData: FormData) => async (dispatch: any) => {
  const formdata = {};
  dispatch({
    type: REGISTER_USER_REQUEST,
  });
  try {
    const res = await api.post("/register", formData);
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
    dispatch(setAlert("Successfully registered", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "failure")));
      dispatch({
        type: REGISTER_USER_FAILURE,
      });
    }
  }
};

// II. Login && Authentication?????? for a user JSWEBTOKEN
export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  const body = { email, password };
  dispatch({
    type: LOGIN_USER_REQUEST,
  });
  try {
    const res = await api.post("/auth", body);
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
    localStorage.setItem("token", res?.data?.token);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error: any) => dispatch(setAlert(error.msg, "failure")));
    }
    dispatch({
      type: LOGIN_USER_FAILURE,
    });
  }
};

// III. Forgot password, sends an email =>checks if it exists in DB sends a reset form
export const forgotPassword = (formData: object) => async (dispatch: any) => {
  dispatch({
    type: FORGOT_PASSWORD_REQUEST,
  });
  try {
    const res = await api.post("/forgot-password", formData);
    dispatch(setAlert("Email has been sent", "success"));
    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FORGOT_PASSWORD_FAILURE,
    });
  }
};

// IV. Reset a user password by sending the new password and updating the User in the DB
export const resetPassword = (formData: object, id: number, token: string) => async (dispatch: any) => {
  console.log("action ", id, token);
  dispatch({
    type: RESET_PASSWORD_REQUEST,
  });
  try {
    const res = await api.post(`/reset-password/${id}/${token}`, formData);
    dispatch(setAlert("Successfully reset the password", "success"));
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
    });
    console.log(err);
    dispatch(setAlert("something went wrong", "failure"));
  }
};

export const checkAuth = () => async (dispatch: any) => {
  let token = localStorage.getItem("token");
  try {
    const res = await api.post(`/check-auth/${token}`);

    dispatch({
      type: CHECKAUTH_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CHECKAUTH_FAILURE,
    });
  }
};
