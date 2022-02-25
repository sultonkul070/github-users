const githubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case "GET_USER_AND_REPOS":
      return {
        ...state,
        user: action.payload.user,
        repos: action.payload.repos,
        loading: false,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "CLEAR_USERS":
      return {
        ...state,
        users: [],
        loading: false,
      };
    case "SEARCH_TEXT":
      return {
        ...state,
        searchText: action.payload,
      };
    case "CHANGE_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "VISITED_PROFILE":
      return {
        ...state,
        visitedUsers: action.payload,
      };
    default:
      return state;
  }
};

export default githubReducer;
