/* eslint-disable react/prop-types */
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Toaster } from "react-hot-toast";
import Navbar from "./Navbar.jsx";

const Layout = ({ title, description, image, children }) => {
    const currentUrl = typeof window !== "undefined" ? window.location.href : "https://dehaatnews.com";

    return (
        <HelmetProvider>
            <Helmet>
                {/* Title and Description */}
                <title>{title || "DehaatNews - Stay Updated"}</title>
                <meta name="description" content={description || "Get the latest news and updates on Dehaat News."} />

                {/* Open Graph Meta Tags (For Facebook, LinkedIn, WhatsApp) */}
                <meta property="og:title" content={title || "Dehaat News"} />
                <meta property="og:description" content={description || "Stay updated with agricultural and global news."} />
                <meta property="og:image" content={image || "https://dehaatnews.com/dehaatnews.jpg"} />
                <meta property="og:url" content={currentUrl} />
                <meta property="og:type" content="website" />

                {/* Twitter Meta Tags (For Twitter Previews) */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={title || "Dehaat News"} />
                <meta name="twitter:description" content={description || "Get the latest updates from Dehaat News."} />
                <meta name="twitter:image" content={image || "https://dehaatnews.com/dehaatnews.jpg"} />

                {/* Favicon */}
                <link rel="icon" type="image/png" href="/dehaatnews.svg" />
            </Helmet>

            <Navbar />
            {children}
            <Toaster position="bottom-center" />
        </HelmetProvider>
    );
};

export default Layout;
