import Sidebar from "../components/layout/Sidebar";
import UserResults from "../components/users/UserResults";
import UserSearch from "../components/users/UserSearch";

function Home() {
  return (
    <div className="flex justify-between">
      <div>
        <UserSearch />
        <UserResults />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
}

export default Home;
