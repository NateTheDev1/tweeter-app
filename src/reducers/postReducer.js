const { POST_OK, FETCH_POSTS } = require("../actions/types");

const initialState = {
  posts: [],
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_OK: {
      return { ...state, posts: [action.payload, ...state.posts] };
    }
    case FETCH_POSTS:
      return { ...state, posts: action.payload };
    default:
      return { ...state };
  }
};

export default postReducer;
