import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./pages/Home"))
const Signin = lazy(() => import("./pages/Signin.jsx"))
const Navbar = lazy(() => import("./components/Navbar.jsx"))



function App() {
  const user = true
  return (
    <>
      <Router>
        <Navbar user={user} />
        <Routes>
          <Route path={"/"} element={<Home />} ></Route>
          <Route path={"/signin"} element={<Signin />}></Route>

        </Routes>
      </Router>
    </>
  );
}

export default App;
