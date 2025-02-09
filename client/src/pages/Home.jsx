import data from "../assets/NewsData.io_Sample_data.json";
import Newscard from "../components/Newscard";
import { motion } from "motion/react"

const Home = () => {
    return (
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16 mt-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {data.map((i) => (
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        key={i.article_id}
                        className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                        <Newscard
                            title={i.title.slice(0, 45)}
                            link={i.link}
                            description={
                                i.description
                                    ? i.description.slice(0, 88)
                                    : "No description available"
                            }
                            pubDate={i.pubDate}
                            sourceId={i.source_id}
                            creator={i.creator ? i.creator : "Anonymous"}
                            imageUrl={i.image_url}
                        />
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default Home;