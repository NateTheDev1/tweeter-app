import Axios from "axios";
import { LIKE_POST, FETCH_POSTS } from "./types";

export const likePost = (postId, userId) => (dispatch) => {
  Axios.post(`https://tweeter-app-api.herokuapp.com/api/posts/like/${postId}`, {
    userId: userId,
  })
    .then((res) => {
      dispatch({ type: LIKE_POST });
    })
    .catch((err) => {
      console.log(err);
    });
  Axios.get("https://tweeter-app-api.herokuapp.com/api/posts/all")
    .then((res) => {
      dispatch({ type: FETCH_POSTS, payload: res.data });
    })
    .catch((err) => {
      console.log(err);
    });
};
