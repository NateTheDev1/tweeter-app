const { POST_OK, FETCH_POSTS } = require("../actions/types");

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_OK: {
      state.posts.push(action.payload);
      return { ...state };
    }
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    default:
      return { ...state };
  }
};

export default postReducer;
