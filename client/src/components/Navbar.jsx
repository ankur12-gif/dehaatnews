/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxAvatar as Avatar } from "react-icons/rx";
import { FaChevronDown, FaChevronUp, FaBars, FaTimes } from "react-icons/fa"; // Icons for menu
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../redux/reducer/userReducer";

const Navbar = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false); // Controls main menu
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false); // Controls avatar dropdown
    const [localDropdownOpen, setLocalDropdownOpen] = useState(false); // Controls local dropdown

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleAvatarDropdown = () => setAvatarDropdownOpen(!avatarDropdownOpen);
    const toggleLocalDropdown = () => setLocalDropdownOpen(!localDropdownOpen);

    const handleHomeClick = () => {
        navigate("/")
    }

    const handleAvatarClick = () => {
        navigate("/admin")
    }

    const handleLogout = () => {
        dispatch(userNotExist());
        navigate("/")
    };

    return (
        <nav className="bg-black text-white h-16 flex items-center justify-between fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <div className="text-2xl font-extrabold p-5">dehaatNews</div>

            {/* Hamburger Menu (for small screens) */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="cursor-pointer md:hidden" onClick={toggleAvatarDropdown}>
                        <Avatar size={30} />
                    </div>
                )}
                <button className="md:hidden text-2xl" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-grow flex justify-center"> {/* Center the navigation links */}
                <ul
                    className={`md:flex md:space-x-7 font-bold bg-black md:bg-transparent transition-all duration-300 md:items-center absolute md:static top-16 left-0 w-full md:w-auto ${menuOpen ? "block" : "hidden"}`}
                >
                    <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" onClick={handleHomeClick}>Home</li>
                    <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700 relative" onClick={toggleLocalDropdown}>
                        <span className="flex justify-center items-center gap-1">
                            Local
                            {localDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </span>
                        {localDropdownOpen && (
                            <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                                <li className="cursor-pointer px-3 py-2 hover:bg-gray-200"><Link to="/local/crime">Crime</Link></li>
                                <li className="cursor-pointer px-3 py-2 hover:bg-gray-200"><Link to="/local/health">Health</Link></li>
                                <li className="cursor-pointer px-3 py-2 hover:bg-gray-200"><Link to="/local/sports">Sports</Link></li>
                                <li className="cursor-pointer px-3 py-2 hover:bg-gray-200"><Link to="/local/story">Story</Link></li>
                                <li className="cursor-pointer px-3 py-2 hover:bg-gray-200"><Link to="/local/farming">Farming</Link></li>
                            </ul>
                        )}
                    </li>
                    <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">World</li>
                    <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" ><a href="/download">ePdf</a></li>
                    <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700"><Link to="/contactus">ContactUs</Link></li>
                </ul>
            </div>

            {/* Avatar (Visible on all screens) */}
            {user ? (
                <div className="pr-5 cursor-pointer relative">
                    {/* Avatar for larger screens */}
                    <div className="hidden md:block">
                        <Avatar size={40} onClick={toggleAvatarDropdown} />
                    </div>
                    {avatarDropdownOpen && (
                        <ul className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                            <li
                                onClick={handleAvatarClick}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                            >
                                Profile
                            </li>
                            <li
                                onClick={handleLogout}
                                className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                            >
                                Logout
                            </li>
                        </ul>
                    )}
                </div>
            ) : (<div>{""}</div>)}
        </nav>
    );
};

export default Navbar;