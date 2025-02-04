/* eslint-disable react-hooks/rules-of-hooks */
import { useFileHandler } from "6pp";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import toast from "react-hot-toast";
import { useNewPostMutation } from "../redux/api/postApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
    const { user } = useSelector((state) => state.user);
    console.log(user)
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const navigate = useNavigate();

    const [newPost, { isLoading }] = useNewPostMutation();

    const photos = useFileHandler("multiple", 5);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error("Enter all fields");
            return;
        }

        if (!photos.file || photos.file.length === 0) {
            toast.error("Please select at least one photo");
            return;
        }

        const formData = new FormData();
        formData.set("title", title);
        formData.set("description", description);

        // Append each file to the FormData
        photos.file.forEach((file) => {
            formData.append("photos", file);
        });

        try {
            // Call the mutation function
            const res = await newPost({ id: user._id, postData: formData });

            if (res.data?.success) {
                toast.success("Post created successfully");
                navigate("/admin");
            } else {
                toast.error("Failed to create post");
            }
        } catch (error) {
            toast.error(`An error occurred while creating the post ${error}`);
        }
    };

    return (
        <div className="bg-gray-600 pt-20 h-screen flex flex-col items-center justify-center">
            {/* Image Preview Section with Swiper */}
            <div className="bg-white h-1/2 w-1/2 rounded-lg m-2 flex items-center justify-center p-4">
                {photos.error && <p className="text-red-500">{photos.error}</p>}

                {photos.preview?.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-full"
                    >
                        {photos.preview.map((img, i) => (
                            <SwiperSlide key={i} className="flex justify-center items-center">
                                <img
                                    src={img}
                                    alt={`Preview ${i}`}
                                    className="w-full h-64 m-2 object-cover rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center">No images selected</p>
                )}
            </div>

            {/* Form Section */}
            <div className="bg-white h-auto w-1/2 text-black font-bold p-4 rounded-lg">
                <form className="flex flex-col space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="mb-2 text-lg block">Title</label>
                        <input
                            type="text"
                            placeholder="Enter Title"
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                        />
                    </div>
                    <div>
                        <label className="mb-2 text-base block">Description</label>
                        <textarea
                            placeholder="Type Message"
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-4 bg-white mx-auto w-full block text-sm border border-gray-400 outline-[#007bff] rounded"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label className="mb-2 text-base block">Photos</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            required
                            onChange={photos.changeHandler}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black text-white h-10 rounded-2xl hover:bg-blue-900"
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
