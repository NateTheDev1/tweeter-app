import {
  REGISTER_START,
  REGISTER_OK,
  REGISTER_FAIL,
  LOGIN_OK,
  LOGIN_START,
  LOGIN_FAIL,
  SET_USER,
  LOADING,
  PROFILE_OK,
  PROFILE_FAIL,
  LOGOUT,
  SET_PROFILE,
  POST_OK,
  FETCH_POSTS,
} from "./types";
import axios from "axios";
import jwt from "jsonwebtoken";

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

export const getUser = (token) => async (dispatch) => {
  await dispatch({ type: LOADING, payload: true });
  let decoded = await jwt.decode(token);
  let uid = decoded._id;
  axios
    .get(`https://tweeter-app-api.herokuapp.com/api/user/${uid}`)
    .then(async (res) => {
      await dispatch({ type: SET_USER, payload: res.data });
      await dispatch({ type: LOADING, payload: false });
    })
    .catch(async (err) => {
      await dispatch({ type: LOADING, payload: false });
    });
};

export const getProfile = (token) => async (dispatch) => {
  let decoded = await jwt.decode(token);
  let uid = decoded._id;
  axios
    .get(`https://tweeter-app-api.herokuapp.com/api/user/profile/${uid}`)
    .then((res) => {
      dispatch({ type: SET_PROFILE, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newProfile = (formValues, userId) => (dispatch) => {
  return axios
    .post(
      `https://tweeter-app-api.herokuapp.com/api/user/profile/${userId}`,
      formValues
    )
    .then(async (res) => {
      await dispatch({ type: PROFILE_OK, payload: res.data });
      return "OK";
    })
    .catch(async (err) => {
      await dispatch({ type: PROFILE_FAIL, error: err.response.data });
      return "BAD";
    });
};

export const logout = () => async (dispatch) => {
  await localStorage.clear("token");
  await dispatch({ type: LOGOUT });

  return "OK";
};

export const createPost = (formValues) => async (dispatch) => {
  const token = localStorage.getItem("token");
  let userId = await jwt.decode(token);

  return axios
    .post(
      `https://tweeter-app-api.herokuapp.com/api/posts/new/${userId._id}`,
      formValues
    )
    .then(async (res) => {
      await dispatch({ type: POST_OK, payload: res.data });
      return "OK";
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getAllPosts = () => (dispatch) => {
  axios
    .get("https://tweeter-app-api.herokuapp.com/api/posts/all")
    .then((res) => {
      dispatch({ type: FETCH_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
