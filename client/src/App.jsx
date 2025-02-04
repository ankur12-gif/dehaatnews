import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";


const Home = lazy(() => import("./pages/Home.jsx"))
const Signin = lazy(() => import("./pages/Signin.jsx"))
const Navbar = lazy(() => import("./components/Navbar.jsx"))
const Admin = lazy(() => import("./pages/Admin.jsx"))
const Createpost = lazy(() => import("./pages/CreatePost.jsx"))



function App() {
  const user = true


  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path={"/"} element={<Home />} ></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/admin"} element={<Admin />}></Route>
          <Route path={"/createPost"} element={<Createpost />} />
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </>
  );
}

export default App;
