import React, { useContext } from "react";
import { Link } from "react-router-dom";
import GithubContext from "../../context/github/GithubContext";

const Sidebar = () => {
  const githubContext = useContext(GithubContext);
  const { visitedUsers } = githubContext;
  console.log(visitedUsers);
  return (
    <div className="bg-white w-80 shadow-2xl rounded p-10">
      <h5 className="text-primary">Search History</h5>
      {JSON.parse(localStorage.getItem("USERS"))?.map((user, index) => (
        <div key={index} className="card shadow-xl p-4">
          <div>
            <div className="avatar">
              <div className="rounded-full shadow w-14 h-14">
                <img src={user.avatar_url} alt="Profile" />
              </div>
            </div>
          </div>
          <div>
            <h2 className="card-title">{user.login}</h2>
            <Link
              className="text-secondary text-opacity-40"
              to={`/user/${user.login}`}
            >
              Visit Profile
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
