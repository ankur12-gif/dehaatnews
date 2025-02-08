import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Signin from "../pages/Signin";


const Protectedroute = () => {

    const { user } = useSelector((state) => state.user);

    if (user) {
        return <Outlet />
    } else {
        return <Signin />
    }
}

export default Protectedroute