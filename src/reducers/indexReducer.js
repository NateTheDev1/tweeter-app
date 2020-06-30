import { LOADING } from "../actions/types";
import { combineReducers } from "redux";
import authReducer from "./authReducer";

const initialState = {
  loading: false,
};

const globalReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: action.payload };
    default:
      return { ...state };
  }
};

const indexReducer = combineReducers({ globalReducer, authReducer });

export default indexReducer;
