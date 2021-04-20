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
} from "../actions/types";

interface initialState {
  orgLoading: boolean;
  projects: null | object[];
  whatToShow: string;
  currentProject: null | object;
  projectId: number;
  needsUpdate: boolean;
}

const initialState = {
  projectLoading: false,
  projects: [{ id: 0 }],
  whatToShow: "OrgsTable",
  currentproject: null,
  projectId: 0,
  needsUpdate: false,
};

function projectReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        projectLoading: true,
      };
      break;
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        needsUpdate: true,
      };
      break;
    case CREATE_PROJECT_FAILURE:
      return {
        ...state,
        projectLoading: false,
      };
      break;
    case LOAD_PROJECT_REQUEST:
      return {
        ...state,
        projectLoading: true,
      };
      break;
    case LOAD_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        projects: payload,
        needsUpdate: false,
      };
      break;
    case LOAD_PROJECT_FAILURE:
      return {
        ...state,
        projectLoading: false,
      };
      break;
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        projectLoading: true,
      };
      break;
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        needsUpdate: true,
      };
      break;
    case DELETE_PROJECT_FAILURE:
      return {
        ...state,
        projectLoading: false,
      };
      break;
    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        projectLoading: true,
      };
      break;
    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        projectLoading: false,
        needsUpdate: true,
      };
      break;
    case UPDATE_PROJECT_FAILURE:
      return {
        ...state,
        projectLoading: false,
      };
      break;
    case SHOW_TABLE_ORGANIZATIONSFORPROJECTS:
      return {
        ...state,
        whatToShow: "OrgsTable",
      };
      break;
    case SHOW_TABLE_CLIENTSTOPICK:
      return {
        ...state,
        whatToShow: "ClientsTable",
      };
      break;
    case SHOW_TABLE_PROJECTS:
      return {
        ...state,
        whatToShow: "ProjectsTable",
      };
      break;
    case SHOW_FORM_PROJECTS:
      return {
        ...state,
        whatToShow: "ProjectsForm",
      };
      break;
    case SHOW_UPDATEFORM_PROJECTS:
      return {
        ...state,
        whatToShow: "ProjectsUpdateForm",
      };
      break;
    case SHOW_WINDOW_PROJECTS:
      return {
        ...state,
        whatToShow: "ProjectsWindow",
      };
      break;
    case SET_CURRENT_PROJECT:
      return {
        ...state,
        currentProject: state.projects.find((el) => el.id === payload),
        projectId: payload,
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
export default projectReducer;
