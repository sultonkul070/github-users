import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "../users/UserItem";
import GithubContext from "../../context/github/GithubContext";
import InfiniteScroll from "react-infinite-scroll-component";

function UserResults() {
  const { users, loading, fetchMore } = useContext(GithubContext);

  return (
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1">
      {!loading ? (
        <InfiniteScroll
          dataLength={users.length}
          next={fetchMore}
          hasMore={true}
          loader={<Spinner />}
        >
          {users.map((user, index) => (
            <UserItem key={index} user={user} />
          ))}
        </InfiniteScroll>
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export default UserResults;
