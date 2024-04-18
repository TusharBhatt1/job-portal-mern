import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import User from "./Pages/User";
import PostJob from "./Pages/PostJob";
import MyJobs from "./Pages/MyJobs";
import UpdateJob from "./Pages/UpdateJob";
import Navbar from "./Components/Navbar";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/my-jobs" element={<MyJobs />} />
        <Route path="/updatejob/:id" element={<UpdateJob />} />
      </Routes>
    </BrowserRouter>
  );
}
