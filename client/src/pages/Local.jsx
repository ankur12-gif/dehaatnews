/* eslint-disable react-hooks/rules-of-hooks */
import { useGetAllPostsQuery } from "../redux/api/postApi";
import Newscard from "../components/Newscard";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import Sponsers from "../components/Sponsers.jsx";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef, useCallback } from "react";

const Local = () => {
    const { category } = useSelector((state) => state.category);

    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoaded, setInitialLoaded] = useState(false);

    const { data, isFetching } = useGetAllPostsQuery({
        page,
        limit: 10,
        category,
    });

    const observer = useRef();

    const lastPostRef = useCallback(
        (node) => {
            if (isFetching || !hasMore) return;

            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            }, { rootMargin: "100px" });

            if (node) observer.current.observe(node);
        },
        [isFetching, hasMore]
    );

    useEffect(() => {
        if (data?.posts?.length) {
            if (page === 1) {
                setPosts(data.posts);
            } else {
                setPosts((prev) => [...prev, ...data.posts]);
            }
            setHasMore(data.hasMore); // Important: Only set false when there's no more
        }

        if (page === 1 && data) {
            setInitialLoaded(true);
        }
    }, [data]);

    useEffect(() => {
        setPage(1);
        setPosts([]);
        setHasMore(true);
        setInitialLoaded(false);
    }, [category]);

    if (!initialLoaded && isFetching) return <Loader />;

    return (
        <motion.div layoutId="underline" className="bg-gray-600 min-h-screen pb-16">
            <div className="pt-4 sm:m-4">
                <Sponsers />
            </div>

            {posts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4">
                    {posts.map((post, idx) => {
                        const isLast = idx === posts.length - 1;
                        console.log(posts)
                        return (
                            <div
                                key={post._id}
                                ref={isLast ? lastPostRef : null}
                                className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <Newscard
                                    title={post.title}
                                    postId={post._id}
                                    link={`/viewfull/${post._id}`}
                                    description={
                                        post.description
                                            ? post.description.slice(0, 88)
                                            : "No description available"
                                    }
                                    pubDate={post.createdAt}
                                    sourceId={"DehatiNews"}
                                    creator={post.creator || "Ajay Sharma"}
                                    imageUrl={post.photos?.[0]?.url}
                                />
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-white text-center text-xl mt-10">No Posts Available</div>
            )}

            {isFetching && page > 1 && <Loader />}
        </motion.div>
    );
};

export default Local;
