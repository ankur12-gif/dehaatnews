import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Protectedroute from "./components/Protectedroute.jsx";
// import { useGetAllNewsQuery } from "./redux/api/newsApi.js";


const Home = lazy(() => import("./pages/Home.jsx"));
const Signin = lazy(() => import("./pages/Signin.jsx"));
const Navbar = lazy(() => import("./components/Navbar.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));
const Createpost = lazy(() => import("./pages/CreatePost.jsx"));
const Local = lazy(() => import("./pages/Local.jsx"));
const Viewfull = lazy(() => import("./pages/Viewfull.jsx"));
const Update = lazy(() => import("./pages/Update.jsx"));
const Download = lazy(() => import("./pages/Download.jsx"));
const Contactus = lazy(() => import("./pages/Contactus.jsx"));
const SponsorsTable = lazy(() => import("./pages/SponsorsTable.jsx"));
const Createsponsor = lazy(() => import("./pages/Createsponsors.jsx"));
const Worldnews = lazy(() => import("./pages/Worldnews.jsx"));




const App = () => {

  // const { data, isLoading } = useGetAllNewsQuery();

  // if (!isLoading)
  //   console.log(data)



  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path={"/home"} element={<Home />}></Route>
          <Route path={"/signin"} element={<Signin />}></Route>
          <Route path={"/local"} element={<Local />} />
          <Route path={"/contactus"} element={<Contactus />} />
          <Route path={"/"} element={<Local />} />
          <Route path={"/download"} element={<Download />} />
          <Route path={"/viewfull/:id"} element={<Viewfull />} />
          <Route path={"/worldNews"} element={<Worldnews />} />
          <Route path={""} element={<Protectedroute />}>
            <Route path={"/admin"} element={<Admin />}></Route>
            <Route path={"/createPost"} element={<Createpost />} />
            <Route path={"/update/:id"} element={<Update />} />
            <Route path={"/sponsors"} element={<SponsorsTable />} />
            <Route path={"/createSponsors"} element={<Createsponsor />} />
          </Route>
        </Routes>
        <Toaster position="bottom-center" />
      </Router>
    </>
  );
}

export default App;
