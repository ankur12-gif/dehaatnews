/* eslint-disable react/prop-types */
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar.jsx"; // Your navigation component


const Layout = ({ title, description, children }) => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>{title || "DehaatNews - Stay Updated"}</title>
                <meta name="description" content={description || "Get the latest news and updates on Dehaat News."} />
                <meta property="og:title" content={title || "Dehaat News"} />
                <meta property="og:description" content={description || "Stay updated with agricultural and global news."} />
                <link rel="icon" type="image/png" href={"/dehaatnews.svg"} />

            </Helmet>

            <Navbar />  {/* Navigation bar on all pages */}
            {children}  {/* Renders the page content */}
            <Toaster position="bottom-center" /> {/* Toast Notifications */}
        </HelmetProvider>
    );
};

export default Layout;
