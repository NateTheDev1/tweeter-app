import {
  LOGOUT,
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_OK,
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_OK,
  SET_USER,
  PROFILE_OK,
  PROFILE_FAIL,
  SET_PROFILE,
  POST_OK,
} from "../actions/types";

const initialState = {
  user: null,
  isAuth: localStorage.getItem("token") ? true : false,
  authorizing: false,
  error: "",
  profile: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_START:
      return { ...state, authorizing: true };
    case REGISTER_FAIL:
      return { ...state, authorizing: false, error: action.error };
    case REGISTER_OK:
      return {
        ...state,
        authorizing: false,
        isAuth: true,
        token: action.payload.token,
        error: "",
        user: action.payload,
      };
    case LOGIN_START:
      return { ...state, authorizing: true };
    case LOGIN_FAIL:
      return { ...state, authorizing: false, error: action.error };
    case LOGIN_OK:
      return {
        ...state,
        authorizing: false,
        isAuth: true,
        token: action.payload.token,
        error: "",
        user: action.payload,
      };
    case SET_USER:
      return { ...state, user: action.payload };
    case SET_PROFILE:
      return { ...state, profile: action.payload };
    case PROFILE_OK:
      return {
        ...state,
        profile: action.payload,
        error: "",
        user: action.payload,
      };
    case PROFILE_FAIL:
      return { ...state, error: action.error };
    case LOGOUT:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default authReducer;
