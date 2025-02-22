import { useState, useRef, useEffect } from "react";
import { RxAvatar as Avatar } from "react-icons/rx";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa"; // Icons for menu
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../redux/reducer/userReducer";
import { setCategory } from "../redux/reducer/postReducer";


const Navbar = () => {
    const { user } = useSelector((state) => state.user)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const avatarRef = useRef(null);
    const localRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false); // Controls main menu
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false); // Controls avatar dropdown
    const [localDropdownOpen, setLocalDropdownOpen] = useState(false); // Controls local dropdown

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleAvatarDropdown = () => setAvatarDropdownOpen(!avatarDropdownOpen);
    const toggleLocalDropdown = () => setLocalDropdownOpen(!localDropdownOpen);

    const handleHomeClick = () => {
        dispatch(setCategory("general"))
        navigate("/local")
    }

    const handleAvatarClick = () => {
        navigate("/admin")
    }

    const handleSponsorClick = () => {
        navigate("/sponsors")
    };


    const handleWorldClick = () => {
        navigate("/worldNews")
    };

    const handleLogout = () => {
        dispatch(userNotExist());
        navigate("/")
    };

    const handlelogoClick = () => {
        dispatch(setCategory("general"))
        navigate("/local")
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                avatarRef.current && !avatarRef.current.contains(event.target)
            ) {
                setAvatarDropdownOpen(false);
            }
            if (
                localRef.current && !localRef.current.contains(event.target)
            ) {
                setLocalDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-black text-white h-16 flex items-center justify-between fixed top-0 left-0 w-full z-50">
            {/* Hamburger Menu (for small screens) */}
            <div className="flex items-center gap-4 p-5">
                <button className="md:hidden text-2xl" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Logo */}
            <div className="text-2xl font-extrabold p-5 md:mr-auto cursor-pointer" onClick={handlelogoClick}>dehaatNews</div>

            {/* Navigation Links and Avatar */}
            <div className="flex items-center justify-end flex-grow pr-5"> {/* Align to right */}
                <div className="options flex-grow md:flex-grow-0 justify-center">
                    <ul
                        className={`md:flex md:space-x-7 font-bold bg-black md:bg-transparent transition-all duration-300 md:items-center absolute md:static top-16 left-0 w-full md:w-auto ${menuOpen ? "block" : "hidden"}`}
                    >
                        <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" onClick={handleHomeClick}>Home</li>
                        <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700 relative" onClick={toggleLocalDropdown} ref={localRef}>
                            <span className="flex items-center gap-1">
                                Local {localDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                            {localDropdownOpen && (
                                <ul className="absolute left-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg z-50">
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("general")) }} >General</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("crime")) }}>Crime</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("health")) }}>Health</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("sports")) }}>Sports</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("story")) }}>Story</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("farming")) }}>Farming</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("tourism")) }} >Tourism</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("culture")) }} >Culture</li>
                                    <li className="cursor-pointer px-3 py-2 hover:bg-gray-200" onClick={() => { dispatch(setCategory("education")) }} >Education</li>

                                </ul>
                            )}
                        </li>
                        <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" onClick={handleWorldClick}>World</li>
                        <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" ><a href="/download">ePage</a></li>
                        <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700"><Link to="/contactus">About Us</Link></li>
                    </ul>
                </div>

                {/* Avatar (Visible on all screens) */}
                {user ? (
                    <div className="relative ml-4" ref={avatarRef}>
                        <div className="hidden md:block cursor-pointer" onClick={toggleAvatarDropdown}>
                            <Avatar size={40} />
                        </div>
                        {avatarDropdownOpen && (
                            <ul className="absolute right-0 mt-2 w-40 bg-black text-white rounded-lg shadow-lg z-50">
                                <li onClick={handleAvatarClick} className="cursor-pointer px-3 py-2 hover:bg-gray-200 font-bold">Posts</li>
                                <li onClick={handleSponsorClick} className="cursor-pointer px-3 py-2 hover:bg-gray-200 font-bold">Sponsors</li>
                                <li onClick={handleLogout} className="cursor-pointer px-3 py-2 hover:bg-gray-200 font-bold">Logout</li>
                            </ul>
                        )}
                    </div>
                ) : (<div>{""}</div>)}
            </div>
        </nav>
    );
};

export default Navbar;