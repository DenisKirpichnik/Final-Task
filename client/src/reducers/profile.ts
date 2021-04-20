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
} from "../actions/types";

interface InitialState {
  accountId: null | number;
  currentProfile: any;
  organizations: any[];
  currentOrg: object | null;
  update: number;
  orgLoading: boolean;
  needsUpdate: boolean;
  whatToShow: string;
  orgId: null | number;
}

const initialState = {
  orgId: 0,
  orgLoading: false,
  accountId: null,
  currentProfile: null,
  organizations: [{ id: 1 }],
  currentOrg: null,
  update: 0,
  needsUpdate: false,
  whatToShow: "Table",
};

function profileReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        orgLoading: true,
      };
      break;
    case CREATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        orgLoading: false,
        needsUpdate: true,
      };
      break;
    case CREATE_ORGANIZATION_FAILURE:
      return {
        ...state,
        orgLoading: false,
      };
      break;
    case LOAD_ORGANIZATIONS_REQUEST:
      return {
        ...state,
        orgLoading: true,
      };
      break;
    case LOAD_ORGANIZATIONS_SUCCESS:
      return {
        ...state,
        organizations: payload.map((el: any) => el.organization),
        needsUpdate: false,
        orgLoading: false,
      };
      break;
    case LOAD_ORGANIZATIONS_FAILURE:
      return {
        ...state,
        orgLoading: false,
      };
      break;
    case DELETE_ORGANIZATION_REQUEST:
      return {
        ...state,
        orgLoading: true,
      };
      break;
    case DELETE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        currentOrg: null,
        orgLoading: false,
        needsUpdate: true,
      };
      break;
    case DELETE_ORGANIZATION_FAILURE:
      return {
        ...state,
        currentOrg: null,
        orgLoading: true,
      };
      break;

    case UPDATE_ORGANIZATION_REQUEST:
      return {
        ...state,
        orgLoading: true,
      };
      break;
    case UPDATE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        orgLoading: false,
        needsUpdate: true,
      };
      break;
    case UPDATE_ORGANIZATION_FAILURE:
      return {
        ...state,
        orgLoading: false,
      };
      break;
    case SET_CURRENT_ORG:
      return {
        ...state,
        currentOrg: state.organizations.find((el) => el.id === payload),
        orgId: payload,
      };
      break;
    case SHOW_TABLE:
      return {
        ...state,
        whatToShow: "Table",
      };
      break;
    case SHOW_FORM:
      return {
        ...state,
        whatToShow: "Form",
      };
      break;
    case SHOW_UPDATEFORM:
      return {
        ...state,
        whatToShow: "UpdateForm",
      };
      break;
    case SHOW_WINDOW:
      return {
        ...state,
        whatToShow: "Window",
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
export default profileReducer;
