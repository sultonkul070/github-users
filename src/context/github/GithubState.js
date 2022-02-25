import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import githubReducer from "./GithubReducer";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    count: 10,
    start: 1,
    visitedUsers: [],
    searchText: "",
    page: 1,
  };

  const github = axios.create({
    baseURL: GITHUB_URL,
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text, page) => {
    const params = new URLSearchParams({
      q: text,
    });
    const response = await github.get(
      `/search/users?${params}&page=${page}&per_page=15`
    );
    return response.data.items;
  };

  // Get user and repos
  const getUserAndRepos = async (login) => {
    const { count, start } = state;
    const [user, repos] = await Promise.all([
      github.get(`/users/${login}?count=${count}&start=${start}`),
      github.get(`/users/${login}/repos`),
    ]);
    return { user: user.data, repos: repos.data };
  };

  const createHistory = (params, login, avatar_url) => {
    state.visitedUsers = JSON.parse(localStorage.getItem("USERS"));
    if (localStorage.getItem("USERS")) {
      state.visitedUsers = JSON.parse(localStorage.getItem("USERS"));
    } else {
      localStorage.setItem(
        "USERS",
        JSON.stringify([
          { avatar_url: state.user.avatar_url, login: params.login },
        ])
      );
    }
    if (
      state.visitedUsers.length &&
      state.visitedUsers.find((user) => user.login === login)
    ) {
      localStorage.setItem(
        "USERS",
        JSON.stringify([
          { avatar_url, login },
          ...state.visitedUsers.filter((user) => user.login !== login),
        ])
      );
    } else {
      localStorage.setItem(
        "USERS",
        JSON.stringify([{ avatar_url, login }, ...state.visitedUsers])
      );
    }
  };

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
        searchUsers,
        getUserAndRepos,
        user: state.user,
        users: state.users,
        count: state.count,
        createHistory,
        visitedUsers: state.visitedUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
