import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
