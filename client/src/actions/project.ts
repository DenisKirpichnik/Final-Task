import api from "../utils/api";

import {
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAILURE,
  LOAD_PROJECT_REQUEST,
  LOAD_PROJECT_SUCCESS,
  LOAD_PROJECT_FAILURE,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_FAILURE,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAILURE,
  SHOW_TABLE_ORGANIZATIONSFORPROJECTS,
  SHOW_TABLE_CLIENTSTOPICK,
  SHOW_TABLE_PROJECTS,
  SHOW_FORM_PROJECTS,
  SHOW_UPDATEFORM_PROJECTS,
  SHOW_WINDOW_PROJECTS,
  SET_CURRENT_PROJECT,
} from "./types";

//Create a new project for a client
export const createProject = (dataForm: object, clientId: number) => async (dispatch: any) => {
  dispatch({
    type: CREATE_PROJECT_REQUEST,
  });
  try {
    const res = await api.post(`/${clientId}/projects/create`, dataForm);
    dispatch({
      type: CREATE_PROJECT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: CREATE_PROJECT_FAILURE,
    });
  }
};
//Gets all the projects
export const getProjects = (clientId: number) => async (dispatch: any) => {
  dispatch({
    type: LOAD_PROJECT_REQUEST,
  });
  try {
    const res = await api.get(`/${clientId}/projects/get`);
    dispatch({
      type: LOAD_PROJECT_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: LOAD_PROJECT_FAILURE,
    });
  }
};

//Deletes the project
export const deleteProject = (projectId: number) => async (dispatch: any) => {
  dispatch({
    type: DELETE_PROJECT_REQUEST,
  });
  try {
    const res = await api.delete(`/projects/${projectId}/delete`);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_PROJECT_FAILURE,
    });
  }
};

//Updates the project
export const updateProject = (dataForm: object, projectId: number) => async (dispatch: any) => {
  dispatch({
    type: DELETE_PROJECT_REQUEST,
  });
  try {
    const res = await api.post(`/projects/${projectId}/update`, dataForm);
    dispatch({
      type: DELETE_PROJECT_SUCCESS,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_PROJECT_FAILURE,
    });
  }
};

export const setCurrentProject = (projectId: number) => async (dispatch: any) => {
  console.log(projectId);
  try {
    dispatch({
      type: SET_CURRENT_PROJECT,
      payload: projectId,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showOrgTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE_ORGANIZATIONSFORPROJECTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showClientsTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE_CLIENTSTOPICK,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showProjectsTable = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_TABLE_PROJECTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showProjectForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_FORM_PROJECTS,
    });
  } catch (err) {
    console.log(err);
  }
};

export const showProjectUpdateForm = () => async (dispatch: any) => {
  try {
    dispatch({
      type: SHOW_UPDATEFORM_PROJECTS,
    });
  } catch (err) {
    console.log(err);
  }
};
