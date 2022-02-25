import { useContext, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";
import GithubContext from "../../context/github/GithubContext";
import InfiniteScroll from "react-infinite-scroll-component";

function UserResults() {
  const { users, searchUsers, searchText, dispatch, page } =
    useContext(GithubContext);
  const [hasMore, setHasMore] = useState(true);
  const fetchMore = async () => {
    const res = await searchUsers(searchText, page);
    if (res.length < 15) {
      setHasMore(false);
    }
    dispatch({ type: "CHANGE_PAGE", payload: page + 1 });

    dispatch({ type: "GET_USERS", payload: [...users, ...res] });
  };
  console.log(users);
  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1">
      {users.length !== 0 ? (
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<Spinner />}
        >
          {users.map((user, index) => (
            <UserItem key={index} user={user} />
          ))}
        </InfiniteScroll>
      ) : (
        <div>
          <h1 className="text-lg shadow-lg shadow-blue-500/50 p-10">
            Search Github users you want to reach...
          </h1>
        </div>
      )}
    </div>
  );
}

export default UserResults;
