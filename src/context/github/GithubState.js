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
  };

  const github = axios.create({
    baseURL: GITHUB_URL,
    headers: { Authorization: `token ${GITHUB_TOKEN}` },
  });

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    });
    const response = await github.get(`/search/users?${params}`);
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

  const fetchMore = () => {
    const { count, start } = state;
    state.start += state.count;
    const res = github.get(`/users?count=${count}&start=${start}`);
    return { users: state.users.concat(res.data) };
  };

  const createHistory = async (params, login, avatar_url) => {
    if (localStorage.getItem("USERS")) {
      state.visitedUsers = await JSON.parse(localStorage.getItem("USERS"));
    } else {
      localStorage.setItem(
        "USERS",
        JSON.stringify([
          { avatar_url: state.user.avatar_url, login: params.login },
        ])
      );
      state.visitedUsers = await JSON.parse(localStorage.getItem("USERS"));
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
        fetchMore,
        count: state.count,
        createHistory,
        visitedUsers: state.visitedUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};
