import api from "../utils/api";

import {
  CREATE_CLIENT_REQUEST,
  CREATE_CLIENT_SUCCESS,
  CREATE_CLIENT_FAILURE,
  LOAD_CLIENT_REQUEST,
  LOAD_CLIENT_SUCCESS,
  LOAD_CLIENT_FAILURE,
  DELETE_CLIENT_REQUEST,
  DELETE_CLIENT_SUCCESS,
  DELETE_CLIENT_FAILURE,
  UPDATE_CLIENT_REQUEST,
  UPDATE_CLIENT_SUCCESS,
  UPDATE_CLIENT_FAILURE,
  SHOW_TABLE_ORGANIZATIONSTOPICK,
  SHOW_TABLE_CLIENTS,
  SHOW_FORM_CLIENTS,
  SHOW_UPDATEFORM_CLIENTS,
  SHOW_WINDOW_CLIENTS,
  SET_CURRENT_CLIENT,
} from "./types";

//Create a new org for a user
export const createClient = (orgForm: object, orgId: number) => async (dispatch: any) => {
  dispatch({
    type: CREATE_CLIENT_REQUEST,
  });
  try {
    const res = await api.post(`/${orgId}/clients/create`, orgForm);
    dispatch({
      type: CREATE_CLIENT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_CLIENT_FAILURE,
    });
  }
};

export const getClients = (orgId: number) => async (dispatch: any) => {
  dispatch({
    type: LOAD_CLIENT_REQUEST,
  });
  try {
    const res = await api.get(`/${orgId}/clients/get`);
    dispatch({
      type: LOAD_CLIENT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_CLIENT_FAILURE,
    });
  }
};

export const deleteClient = (clientId: number) => async (dispatch: any) => {
  dispatch({
    type: DELETE_CLIENT_REQUEST,
  });
  try {
    const res = await api.delete(`/clients/${clientId}/delete`);
    dispatch({
      type: DELETE_CLIENT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_CLIENT_FAILURE,
    });
  }
};

export const updateClient = (formData: object, clientId: number) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_CLIENT_REQUEST,
  });
  try {
    const res = await api.post(`/clients/${clientId}/update`, formData);
    dispatch({
      type: UPDATE_CLIENT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_CLIENT_FAILURE,
    });
  }
};

/// Which table to show
export const showOrgsTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE_ORGANIZATIONSTOPICK,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showClientsTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE_CLIENTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_FORM_CLIENTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showUpdateForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_UPDATEFORM_CLIENTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showWindow = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_WINDOW_CLIENTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setCurrentClient = (clientId: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_CURRENT_CLIENT,
      payload: clientId,
    });
  } catch (err) {
    console.log(err);
  }
};
