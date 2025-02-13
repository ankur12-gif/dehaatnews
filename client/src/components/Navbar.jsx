/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxAvatar as Avatar } from "react-icons/rx";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa"; // Icons for menu
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userNotExist } from "../redux/reducer/userReducer";

const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Chinese",
];

const Navbar = () => {
    const { user } = useSelector((state) => state.user)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [menuOpen, setMenuOpen] = useState(false); // Controls main menu
    const [isOpen, setIsOpen] = useState(false); // Controls language dropdown
    const [selectedLanguage, setSelectedLanguage] = useState("English");
    const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false); // Controls avatar dropdown

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const toggleAvatarDropdown = () => setAvatarDropdownOpen(!avatarDropdownOpen);

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false); // Close dropdown after selection
    };

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
        <nav className="bg-black text-white px-5 h-16 flex items-center justify-between fixed top-0 left-0 w-full z-50">
            {/* Logo */}
            <div className="text-2xl font-extrabold mr-5">dehatiNews</div>

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
            <ul
                className={`md:flex md:space-x-7 font-bold bg-black md:bg-transparent transition-all duration-300 md:items-center absolute md:static top-16 left-0 w-full md:w-auto ${menuOpen ? "block" : "hidden"}`}
            >
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" onClick={handleHomeClick}>Home</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">Business</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">Politics</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">Entertainment</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">Science</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700">Health</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700" ><a href="/download">eCopy</a></li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0 hover:bg-gray-700"><Link to="/local">Local</Link></li>


                {/* Language Dropdown */}
                <li className="relative px-5 py-3 md:px-0 md:py-0">
                    <button
                        onClick={toggleDropdown}
                        className="flex items-center border-2 border-white rounded-2xl px-3 py-1 hover:bg-white hover:text-black"
                    >
                        {selectedLanguage}
                        <FaChevronDown
                            className={`ml-2 transition-transform ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>
                    {isOpen && (
                        <ul className="absolute left-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg z-50">
                            {languages.map((lang) => (
                                <li
                                    key={lang}
                                    onClick={() => handleLanguageSelect(lang)}
                                    className={`cursor-pointer px-3 py-2 hover:bg-gray-200 ${selectedLanguage === lang ? "bg-gray-300 font-bold" : ""}`}
                                >
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>

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