import { useGetAllPostsQuery } from "../redux/api/postApi";
import Newscard from "../components/Newscard";
import Loader from "../components/Loader";
import { motion } from "framer-motion"; // Corrected import
import Sponsers from "../components/Sponsers.jsx";

const Local = () => {
    const { data, isLoading } = useGetAllPostsQuery();
    console.log(data);

    if (isLoading) return <Loader />;

    return (
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16">
            {/* Sponsers Component with proper spacing */}
            <div className="pt-4 sm:m-4"> {/* Add padding-top to ensure spacing */}
                <Sponsers />
            </div>

            {/* Check if posts exist */}
            {data.posts && data.posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4"> {/* Add margin-top to ensure spacing */}
                    {data.posts.map((i) => (
                        <div
                            key={i._id}
                            className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                        >
                            <Newscard
                                title={i.title.slice(0, 45)}
                                link={`/viewfull/${i._id}`}
                                description={
                                    i.description
                                        ? i.description.slice(0, 88)
                                        : "No description available"
                                }
                                pubDate={i.createdAt}
                                sourceId={"DehatiNews"}
                                creator={i.creator ? i.creator : "Ajay Sharma"}
                                imageUrl={i.photos[0]?.url}
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