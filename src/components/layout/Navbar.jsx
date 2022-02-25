import { useContext } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GithubContext from "../../context/github/GithubContext";

const Navbar = () => {
  const { dispatch, searchUsers, searchText } = useContext(GithubContext);

  const setToast = (msg) => toast(msg);

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_TEXT", payload: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (searchText === "") {
      setToast("Please enter something");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(searchText, 0);
      dispatch({ type: "GET_USERS", payload: users });

      dispatch({ type: "CHANGE_PAGE", payload: 1 });
    }
  };
  return (
    <nav className="navbar mb-6 shadow-lg bg-primary text-neutral-content sticky z-10">
      <div className="flex-none container mx-auto">
        <div>
          <FaGithub className="inline pr-2 text-4xl" />
          <Link to="/" className="text-xl font-bold align-middle">
            GitHub Users
          </Link>
        </div>
        <div className="flex-1">
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <div className="flex items-center">
                <input
                  type="text"
                  className="ml-auto bg-white input input-sm outline-0 text-black shadow-2xl rounded w-96"
                  placeholder="Search user..."
                  value={searchText}
                  onChange={handleChange}
                />
                <button
                  type="submit"
                  className="rounded w-36 btn btn-sm btn-primary "
                >
                  Search
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
