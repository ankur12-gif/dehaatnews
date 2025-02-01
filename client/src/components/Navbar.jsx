/* eslint-disable react/prop-types */
import { useState } from "react";
import { RxAvatar as Avatar } from "react-icons/rx";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa"; // Icons for menu

const languages = ["English", "Hindi", "Spanish", "French", "German", "Chinese"];

const Navbar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false); // Controls main menu
    const [isOpen, setIsOpen] = useState(false); // Controls language dropdown
    const [selectedLanguage, setSelectedLanguage] = useState("English");

    const toggleMenu = () => setMenuOpen(!menuOpen);
    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleLanguageSelect = (lang) => {
        setSelectedLanguage(lang);
        setIsOpen(false); // Close dropdown after selection
    };

    return (
        <nav className="bg-black text-white px-5 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-extrabold mr-5">DehatiNews</div>

            {/* Hamburger Menu (for small screens) */}
            <div className="flex items-center gap-4">
                {user && (
                    <div className="md:hidden cursor-pointer">
                        <Avatar size={30} />
                    </div>
                )}
                <button className="md:hidden text-2xl" onClick={toggleMenu}>
                    {menuOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Navigation Links */}
            <ul
                className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex md:space-x-7 font-bold bg-black md:bg-transparent transition-all duration-300 md:items-center z-50 ${menuOpen ? "block" : "hidden"
                    }`}
            >
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Home</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Business</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Politics</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Entertainment</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Science</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Health</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Sports</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Local</li>
                <li className="cursor-pointer px-5 py-3 md:px-0 md:py-0">Crypto</li>

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
                                    className={`cursor-pointer px-3 py-2 hover:bg-gray-200 ${selectedLanguage === lang ? "bg-gray-300 font-bold" : ""
                                        }`}
                                >
                                    {lang}
                                </li>
                            ))}
                        </ul>
                    )}
                </li>
            </ul>

            {/* Avatar (Visible on large screens) */}
            {user && (
                <div className="hidden md:block pr-5 cursor-pointer ml-5">
                    <Avatar size={40} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
