import { useContext } from "react";
import GithubContext from "../../context/github/GithubContext";

function UserSearch() {
  const { users, dispatch } = useContext(GithubContext);
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8">
      {users.length > 0 && (
        <div>
          <button
            onClick={() => dispatch({ type: "CLEAR_USERS" })}
            className="btn btn-ghost btn-md text-primary"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
