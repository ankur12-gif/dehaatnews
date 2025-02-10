import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Protectedroute from "./components/Protectedroute.jsx";
import { useGetAllNewsQuery } from "./redux/api/newsApi.js";


const Home = lazy(() => import("./pages/Home.jsx"));
const Signin = lazy(() => import("./pages/Signin.jsx"));
const Navbar = lazy(() => import("./components/Navbar.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const Createpost = lazy(() => import("./pages/CreatePost.jsx"));
const Local = lazy(() => import("./pages/Local.jsx"));
const Viewfull = lazy(() => import("./pages/Viewfull.jsx"));
const Update = lazy(() => import("./pages/Update.jsx"));
const Sponsers = lazy(() => import("./pages/Sponsers.jsx"));


const AppContent = () => {
  const location = useLocation();

  const { data, isLoading } = useGetAllNewsQuery();

  if (!isLoading)
    console.log(data)

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Sponsers />} />
      </Routes>
    </>
  );
};

function App() {


  return (
    <>
      <Router>

        <AppContent />
        <Routes>
          <Route path={"/home"} element={<Home />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/local"} element={<Local />} />
          <Route path={"/viewfull/:id"} element={<Viewfull />} />

          <Route path={""} element={<Protectedroute />}>
            <Route path={"/admin"} element={<Admin />}></Route>
            <Route path={"/createPost"} element={<Createpost />} />
            <Route path={"/update/:id"} element={<Update />} />
          </Route>
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </>
  );
}

export default App;
