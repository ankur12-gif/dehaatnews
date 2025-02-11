import { useGetAllPostsQuery } from "../redux/api/postApi"
import Newscard from "../components/Newscard";
import Loader from "../components/Loader";
import { motion } from "motion/react"
import Sponsers from "../components/Sponsers.jsx"

const Local = () => {

    const { data, isLoading } = useGetAllPostsQuery();
    console.log(data)

    return (isLoading ? <Loader /> : (data.posts && data.posts.length > 0 ?
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16">
            <Sponsers />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.posts.map((i) => (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={i._id}
                        className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Newscard
                            key={i._id}
                            title={i.title.slice(0, 45)}
                            link={`/viewfull/${i._id}`}
                            description={
                                i.description
                                    ? i.description.slice(0, 88)
                                    : "No description available"
                            }
                            pubDate={i.createdAt}
                            sourceId={"DehatiNews"}
                            creator={i.creator ? i.creator : "Anonymous"}
                            imageUrl={i.photos[0].url}
                        />
                    </motion.button>
                ))}
            </div>
        </motion.div> : <div>No Posts Available</div>)
    )
}

export default Local