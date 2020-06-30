import {
  LOGOUT,
  LOGIN_START,
  LOGIN_FAIL,
  LOGIN_OK,
  REGISTER_START,
  REGISTER_FAIL,
  REGISTER_OK,
} from "../actions/types";

const initialState = {
  user: null,
  isAuth: localStorage.getItem("token") ? true : false,
  authorizing: false,
  error: "",
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
    default:
      return { ...state };
  }
};

export default authReducer;
