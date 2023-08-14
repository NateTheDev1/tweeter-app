import Axios from "axios";
import { LIKE_POST, FETCH_POSTS, UNLIKE_POST, POST_OK } from "./types";
import jwt from "jsonwebtoken";

export const likePost = (postId, userId) => (dispatch) => {
  Axios.post(
    `https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/like/${postId}`,
    {
      userId: userId,
    }
  )
    .then((res) => {
      dispatch({ type: LIKE_POST });
    })
    .catch((err) => {
      console.log(err);
    });
  Axios.get("https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/all")
    .then((res) => {
      dispatch({ type: FETCH_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const unlikePost = (postId, userId) => (dispatch) => {
  Axios.post(
    `https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/unlike/${postId}`,
    {
      userId: userId,
    }
  )
    .then((res) => {
      dispatch({ type: UNLIKE_POST });
    })
    .catch((err) => {
      console.log(err);
    });
  Axios.get("https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/all")
    .then((res) => {
      dispatch({ type: FETCH_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deletePost = (postId) => async (dispatch) => {
  await Axios.delete(
    `https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/${postId}`
  )
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  Axios.get("https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/all")
    .then((res) => {
      dispatch({ type: FETCH_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const retweet = (postValues) => async (dispatch) => {
  const token = localStorage.getItem("token");
  let userId = await jwt.decode(token);

  return Axios.post(
    `https://tweeter-server-cbd3449ade35.herokuapp.com/api/posts/new/${userId._id}`,
    postValues
  )
    .then(async (res) => {
      await dispatch({ type: POST_OK, payload: res.data });
      return "OK";
    })
    .catch((err) => {
      console.log(err);
    });
};
