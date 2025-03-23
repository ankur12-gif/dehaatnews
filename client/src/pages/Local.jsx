/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAllPostsQuery } from "../redux/api/postApi";
import Newscard from "../components/Newscard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Sponsers from "../components/Sponsers.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Local = () => {
    const { data, isLoading } = useGetAllPostsQuery();
    const { category } = useSelector((state) => state.category);

    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        if (data?.posts) {
            const newFilteredPosts =
                category !== "general"
                    ? data.posts.filter((post) => post.category === category)
                    : data.posts;

            setFilteredPosts(newFilteredPosts);
        }
    }, [category, data]); // Removed `filteredPosts` from dependencies to prevent infinite loop

    if (isLoading) return <Loader />;

    return (
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16">
            {/* Sponsers Component */}
            <div className="pt-4 sm:m-4">
                <Sponsers />
            </div>

            {/* Check if posts exist */}
            {filteredPosts.length > 0 ? ( // FIXED: `filteredPosts` is an array, not an object
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4">
                    {filteredPosts.map((i) => (
                        <div
                            key={i._id}
                            className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <Newscard
                                title={i.title}
                                postId={i._id}
                                link={`/viewfull/${i._id}`}
                                description={
                                    i.description
                                        ? i.description.slice(0, 88)
                                        : "No description available"
                                }
                                pubDate={i.createdAt}
                                sourceId={"DehatiNews"}
                                creator={i.creator ? i.creator : "Ajay Sharma"}
                                imageUrl={i.photos?.[0]?.url} // Added optional chaining for safety
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white text-center text-xl mt-10">No Posts Available</div>
            )}
        </motion.div>
    );
};

export default Local;
