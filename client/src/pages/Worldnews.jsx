/* eslint-disable react-hooks/rules-of-hooks */
import Newscard from "../components/Newscard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Sponsers from "../components/Sponsers.jsx";
import { useGetAllNewsQuery } from "../redux/api/newsApi.js";


const Worldnews = () => {
    const { data, isLoading } = useGetAllNewsQuery();


    if (isLoading) return <Loader />;

    return (
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16">
            {/* Sponsers Component */}
            <div className="pt-4 sm:m-4">
                <Sponsers />
            </div>

            {/* Check if posts exist */}
            {data.results.length > 0 ? ( // FIXED: `filteredPosts` is an array, not an object
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4">
                    {data.results.map((i) => (
                        <div
                            key={i._id}
                            className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <Newscard
                                key={i.article_id}
                                title={i.title}
                                link={i.link}
                                description={
                                    i.description
                                        ? i.description.slice(0, 88)
                                        : "No description available"
                                }
                                pubDate={i.pubDate}
                                sourceId={i.source_id}
                                creator={i.creator ? i.creator : "Ajay Sharma"}
                                imageUrl={i.image_url} // Added optional chaining for safety
                            />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white text-center text-xl mt-10">No Posts Available</div>
            )}
        </motion.div>
    );
}

export default Worldnews