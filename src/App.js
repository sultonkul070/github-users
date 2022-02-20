import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import User from "./pages/User";
import NotFound from "./pages/NotFound";
import { GithubProvider } from "./context/github/GithubState";
import Sidebar from "./components/layout/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <GithubProvider>
      <Router>
        <div className="flex flex-col h-screen">
          <Navbar />
          <div className="flex flex-row justify-between mb-auto container mx-auto px-3 pb-12">
            <div className="mr-auto">
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </div>

          <Footer />
        </div>
      </Router>
    </GithubProvider>
  );
}

export default App;
