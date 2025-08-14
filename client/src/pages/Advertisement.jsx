import { useGetLimitedSponsorsQuery } from "../redux/api/sponsorsApi.js";
import Loader from "../components/Loader";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const Advertisement = () => {
    const [sponsors, setSponsors] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [initialLoaded, setInitialLoaded] = useState(false);
    const observerRef = useRef(null);
    const loadingRef = useRef(false);

    const { data, isFetching, error } = useGetLimitedSponsorsQuery(
        { page, limit: 12 },
        { keepPreviousData: true, refetchOnMountOrArgChange: false }
    );

    // Handle data updates
    useEffect(() => {
        if (!data) return;
        loadingRef.current = false;

        if (page === 1) {
            setSponsors(data.sponsors || []);
        } else {
            setSponsors((prev) => {
                const newSponsors = (data.sponsors || []).filter(
                    (sponsor) => !prev.some((p) => p._id === sponsor._id)
                );
                return [...prev, ...newSponsors];
            });
        }

        setHasMore(data?.hasMore ?? false);
        setInitialLoaded(true);
    }, [data, page]);

    // Infinite scroll observer
    useEffect(() => {
        if (!initialLoaded || !hasMore || isFetching) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (entry.isIntersecting && !loadingRef.current) {
                    loadingRef.current = true;
                    setPage((prev) => prev + 1);
                }
            },
            { root: null, rootMargin: "100px", threshold: 1.0 }
        );

        observerRef.current = observer;

        const sponsorItems = document.querySelectorAll(".sponsor-item");
        const lastItem = sponsorItems[sponsorItems.length - 1];

        if (lastItem) observer.observe(lastItem);

        return () => observer.disconnect();
    }, [sponsors, hasMore, isFetching, initialLoaded]);

    // Error state
    if (error) {
        return (
            <div className="bg-gray-600 min-h-screen flex items-center justify-center px-4">
                <div className="text-white text-center text-lg sm:text-xl">
                    Error loading sponsors. Please try again.
                </div>
            </div>
        );
    }

    // Initial loading state
    if (!initialLoaded && isFetching) {
        return (
            <div className="bg-gray-600 min-h-screen flex items-center justify-center">
                <Loader />
            </div>
        );
    }

    return (
        <motion.div
            className="bg-gray-600 min-h-screen pb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {/* Sponsors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-3 p-2 sm:p-6 mt-16 ">

                {sponsors.length > 0 ? (
                    sponsors.map((sponsor, idx) => (
                        <div
                            key={`${sponsor._id}-${idx}`}
                            className="sponsor-item flex flex-col items-center rounded-xl p-4 bg-gray-500"
                        >
                            <img
                                src={sponsor.photos?.[0]?.url}
                                alt=""
                                className="w-full aspect-square max-w-xs rounded-lg object-contain"
                            />
                        </div>
                    ))
                ) : (
                    !isFetching && (
                        <div className="text-white text-center text-xl mt-10">
                            No Sponsors Available
                        </div>
                    )
                )}
            </div>

            {/* Loader for more data */}
            {isFetching && page > 1 && (
                <div className="flex justify-center my-8">
                    <Loader />
                </div>
            )}

            {/* Load More Button */}
            {hasMore && !isFetching && sponsors.length > 0 && (
                <div className="flex justify-center my-8 px-4">
                    <button
                        onClick={() => setPage((prev) => prev + 1)}
                        className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-full transition-colors duration-200"
                    >
                        Load More
                    </button>
                </div>
            )}
        </motion.div>
    );
};

export default Advertisement;
