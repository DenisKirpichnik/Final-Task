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
} from "../actions/types";

// interface Client {
//   id: number
//   firstName: string
// }
type Client = any;

interface InitialState {
  clientLoading: boolean;
  clients: null | Client[];
  whatToShow: string;
  currentClient: null | object;
  clientId: number;
  needsUpdate: boolean;
}

const initialState = {
  whatToShow: "OrgsTable",
  clientLoading: false,
  clients: [{ id: 1 }],
  currentClient: null,
  clientId: 0,
  needsUpdate: false,
};

function clientReducer(state: InitialState = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_CLIENT_REQUEST:
      return {
        ...state,
        clientLoading: true,
      };
      break;
    case CREATE_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        needsUpdate: true,
      };
      break;
    case CREATE_CLIENT_FAILURE:
      return {
        ...state,
        clientLoading: false,
      };
      break;
    case LOAD_CLIENT_REQUEST:
      return {
        ...state,
        clientLoading: true,
      };
      break;
    case LOAD_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        clients: payload.map((el: any) => el.client),
        needsUpdate: false,
      };
      break;
    case LOAD_CLIENT_FAILURE:
      return {
        ...state,
        clientLoading: false,
      };
      break;
    case DELETE_CLIENT_REQUEST:
      return {
        ...state,
        clientLoading: true,
      };
      break;
    case DELETE_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        needsUpdate: true,
      };
      break;
    case DELETE_CLIENT_FAILURE:
      return {
        ...state,
        clientLoading: false,
      };
      break;
    case UPDATE_CLIENT_REQUEST:
      return {
        ...state,
        clientLoading: true,
      };
      break;
    case UPDATE_CLIENT_SUCCESS:
      return {
        ...state,
        clientLoading: false,
        needsUpdate: true,
      };
      break;
    case UPDATE_CLIENT_FAILURE:
      return {
        ...state,
        clientLoading: false,
      };
      break;
    case SHOW_TABLE_ORGANIZATIONSTOPICK:
      return {
        ...state,
        whatToShow: "OrgsTable",
      };
      break;
    case SHOW_TABLE_CLIENTS:
      return {
        ...state,
        whatToShow: "ClientsTable",
      };
      break;
    case SHOW_FORM_CLIENTS:
      return {
        ...state,
        whatToShow: "ClientsForm",
      };
      break;
    case SHOW_UPDATEFORM_CLIENTS:
      return {
        ...state,
        whatToShow: "ClientsUpdateForm",
      };
      break;
    case SHOW_WINDOW_CLIENTS:
      return {
        ...state,
        whatToShow: "ClientWindow",
      };
      break;
    case SET_CURRENT_CLIENT:
      return {
        ...state,
        currentClient: state.clients ? state.clients.find((el: Client) => el.id === payload): null,
        clientId: payload,
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
export default clientReducer;
