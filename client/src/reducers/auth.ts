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
} from "../actions/types";

interface InitialState {
  isAuthenticated: boolean;
  token: string | null;
  accountId: null | number | any;
  loginLoading: boolean;
  registrerLoading: boolean;
  forgotPassLoading: boolean;
  resetPassLoading: boolean;
  user: object | null;
}

const initialState: InitialState = {
  isAuthenticated: false,
  token: localStorage.getItem("token"),
  accountId: 0,
  loginLoading: false,
  registrerLoading: false,
  forgotPassLoading: false,
  resetPassLoading: false,
  user: null,
};

function authReducer(state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_USER_REQUEST:
      return {
        ...state,
        ...payload,
        registrerLoading: true,
      };
      break;
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        registrerLoading: false,
      };
      break;
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        ...payload,
        registrerLoading: false,
      };
      break;
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loginLoading: true,
      };
      break;
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loginLoading: false,
        token: action.payload.token,
        accountId: payload.id,
      };
      break;
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        loginLoading: false,
        token: null,
      };
      break;
    case FORGOT_PASSWORD_REQUEST:
      return {
        ...state,
        forgotPassLoading: true,
      };
      break;
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPassLoading: false,
      };
      break;
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPassLoading: false,
      };
      break;
    case RESET_PASSWORD_REQUEST:
      return {
        ...state,
        resetPassLoading: true,
      };
      break;
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPassLoading: false,
      };
      break;
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPassLoading: false,
      };
      break;
    case CHECKAUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: payload,
        accountId: payload.id,
      };
      break;
    case CHECKAUTH_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        accountId: 0, // need to change that
      };
      break;
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
      break;
    default:
      return {
        ...state,
      };
  }
}
export default authReducer;
