import { REGISTER_START, REGISTER_OK, REGISTER_FAIL } from "./types";
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
