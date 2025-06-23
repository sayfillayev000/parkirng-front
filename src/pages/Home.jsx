import { ToastContainer } from "react-toastify";
import { HomeLeft, HomeRight, Navbar } from "../components";
import "react-toastify/dist/ReactToastify.css";

const Home = () => (
  <>
    <Navbar />
    <div className="flex h-[91.6%] w-full">
      <HomeLeft />
      <HomeRight />
    </div>
    <ToastContainer />
  </>
);

export default Home;
