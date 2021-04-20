import {
  CREATE_ORGANIZATION_REQUEST,
  CREATE_ORGANIZATION_SUCCESS,
  CREATE_ORGANIZATION_FAILURE,
  LOAD_ORGANIZATIONS_REQUEST,
  LOAD_ORGANIZATIONS_SUCCESS,
  LOAD_ORGANIZATIONS_FAILURE,
  DELETE_ORGANIZATION_REQUEST,
  DELETE_ORGANIZATION_SUCCESS,
  DELETE_ORGANIZATION_FAILURE,
  UPDATE_ORGANIZATION_REQUEST,
  UPDATE_ORGANIZATION_SUCCESS,
  UPDATE_ORGANIZATION_FAILURE,
  SET_CURRENT_ORG,
  SHOW_TABLE,
  SHOW_FORM,
  SHOW_UPDATEFORM,
  SHOW_WINDOW,
} from "./types";

import api from "../utils/api";

//Create a new org for a user
export const createOrganization = (orgForm: object, accountId: number) => async (dispatch: any) => {
  dispatch({
    type: CREATE_ORGANIZATION_REQUEST,
  });
  try {
    const res = await api.post(`/${accountId}/organizations`, orgForm);
    dispatch({
      type: CREATE_ORGANIZATION_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_ORGANIZATION_FAILURE,
    });
  }
};

//Create a new business for a user
export const getOrganizations = (accountId: number | null) => async (dispatch: any) => {
  dispatch({
    type: LOAD_ORGANIZATIONS_REQUEST,
  });
  try {
    const res = await api.get(`/${accountId}/organizations`);
    dispatch({
      type: LOAD_ORGANIZATIONS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_ORGANIZATIONS_FAILURE,
    });
  }
};

export const setcurrentorganization = (orgId: number) => async (dispatch: any) => {
  try {
    dispatch({
      type: SET_CURRENT_ORG,
      payload: orgId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteOrganization = (orgId: number) => async (dispatch: any) => {
  dispatch({
    type: DELETE_ORGANIZATION_REQUEST,
  });
  try {
    const res = await api.delete(`/${orgId}/organizations/delete`);
    dispatch({
      type: DELETE_ORGANIZATION_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_ORGANIZATION_FAILURE,
    });
  }
};

export const updateOrganization = (orgId: number, orgForm: any) => async (dispatch: any) => {
  dispatch({
    type: UPDATE_ORGANIZATION_REQUEST,
  });
  try {
    const res = await api.post(`/${orgId}/organizations/update`, orgForm);
    dispatch({
      type: UPDATE_ORGANIZATION_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: UPDATE_ORGANIZATION_FAILURE,
    });
  }
};
/// Which table to show
export const showTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_FORM,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showUpdateForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_UPDATEFORM,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showWindow = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_WINDOW,
    });
  } catch (err) {
    console.log(err);
  }
};
