import { useContext, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import GithubContext from "../../context/github/GithubContext";

const Navbar = () => {
  const [text, setText] = useState("");

  const { dispatch, searchUsers } = useContext(GithubContext);

  const setToast = (msg) => toast(msg);

  const handleChange = (e) => setText(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text === "") {
      setToast("Please enter something");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({ type: "GET_USERS", payload: users });

      setText("");
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
                  value={text}
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
