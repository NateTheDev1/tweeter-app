import {
  REGISTER_START,
  REGISTER_OK,
  REGISTER_FAIL,
  LOGIN_OK,
  LOGIN_START,
  LOGIN_FAIL,
} from "./types";
import axios from "axios";

export const registerUser = (formValues) => (dispatch) => {
  dispatch({ type: REGISTER_START });

  return axios
    .post("https://tweeter-app-api.herokuapp.com/api/user/register", formValues)
    .then(async (res) => {
      await dispatch({ type: REGISTER_OK, payload: res.data });
      localStorage.setItem("token", res.data.token);
      return "OK";
    })
    .catch(async (error) => {
      await dispatch({ type: REGISTER_FAIL, error: error.response.data });
    });
};

export const loginUser = (formValues) => (dispatch) => {
  dispatch({ type: LOGIN_START });
  return axios
    .post("https://tweeter-app-api.herokuapp.com/api/user/login", formValues)
    .then(async (res) => {
      await dispatch({ type: LOGIN_OK, payload: res.data });
      localStorage.setItem("token", res.data.token);
      return "OK";
    })
    .catch(async (err) => {
      await dispatch({ type: LOGIN_FAIL, error: err.response.data });
    });
};
