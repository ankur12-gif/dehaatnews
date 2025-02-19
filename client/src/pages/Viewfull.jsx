import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../redux/api/postApi";
import Loader from "../components/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Viewfull = () => {
    const params = useParams();

    // Fetch the single post data
    const { data, isLoading } = useGetSinglePostQuery({ postId: params.id });

    // Show a loader while data is being fetched
    if (isLoading) return <Loader />;

    // Function to split description into paragraphs
    const formatDescription = (description) => {
        if (!description) return []; // Handle empty description
        return description.split("\n"); // Split by line breaks
    };

    // Get formatted paragraphs
    const paragraphs = formatDescription(data?.post?.description);

    // Extract images
    const photos = data?.post?.photos || [];
    const firstImage = photos[0]?.url;
    const secondImage = photos[1]?.url; // Second image if available

    return (
        <div className="bg-gray-600 pt-20 min-h-screen flex justify-center p-4">
            <div className="bg-white h-auto w-full sm:w-3/4 md:w-1/2 rounded-lg m-2">
                {/* Post Title */}
                <div className="flex justify-center p-2 m-4 font-bold text-2xl sm:text-3xl">
                    {data.post.title}
                </div>

                {/* Image Swiper */}
                {firstImage ? (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-96" // Fixed height for Swiper
                        style={{ aspectRatio: '4/3' }} // Set aspect ratio
                    >
                        {photos.map((photo, index) => (
                            <SwiperSlide key={index} className="flex justify-center items-center">
                                <div className="flex justify-center items-center w-full h-full"> {/* Center the image */}
                                    <img
                                        src={photo.url} // Access the url property of each photo object
                                        alt={`Post Image ${index + 1}`}
                                        className="max-w-full max-h-full object-contain" // Ensure images are fully visible
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center text-gray-600 p-4">No images available</p>
                )}

                {/* Post Description */}
                <div className="flex flex-col justify-center p-4 m-4 text-lg font-semibold sm:text-base">
                    {paragraphs.map((paragraph, index) => (
                        <div key={index}>
                            <p className="mb-4 text-lgl">{paragraph}</p>
                            {/* Insert second image after the third paragraph if available */}
                            {index === 4 && secondImage && (
                                <div className="flex justify-center my-6">
                                    <img
                                        src={secondImage}
                                        alt="Second Post Image"
                                        className="w-full max-h-96 object-contain rounded-lg shadow-lg"
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Viewfull;
