import { useNavigate, useParams } from "react-router-dom";
import {
    useDeleteImageMutation,
    useGetSinglePostQuery,
    useUpdatePostMutation,
} from "../redux/api/postApi";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useFileHandler } from "6pp";
import toast from "react-hot-toast";

const Update = () => {
    const { user } = useSelector((state) => state.user);
    const params = useParams();

    const [deletePost] = useDeleteImageMutation();

    const { data, isLoading: Loading } = useGetSinglePostQuery({
        userId: user._id,
        postId: params.id,
    });

    const [updatedPost, { isLoading }] = useUpdatePostMutation({
        userId: user._id,
        postId: params.id,
    });

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const photos = useFileHandler("multiple", 5);

    useEffect(() => {
        if (data?.post) {
            setTitle(data.post.title);
            setDescription(data.post.description);
        }
    }, [data]);

    const handleUpdateFormSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            toast.error("Title and description are required");
            return;
        }

        const formData = new FormData();
        formData.set("title", title);
        formData.set("description", description);

        // Append each file to the FormData
        (photos.file || []).forEach((file) => {
            formData.append("photos", file);
        });

        try {
            const res = await updatedPost({
                id: user._id,
                postId: params.id,
                postData: formData,
            });
            if (res.error) {
                toast.error(
                    res.error.data?.message || "An error occurred while updating the post"
                );
            } else {
                toast.success("Post updated successfully!");
                navigate(`/admin`);
            }
        } catch (error) {
            toast.error(
                `An error occurred while updating the post: ${error.message}`
            );
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 5) {
            toast.error("You can upload a maximum of 5 files");
            return;
        }
        photos.changeHandler(e);
    };

    const handleDeleteImage = async (imageId) => {
        const postId = params.id;

        try {
            const { data } = await deletePost({ postId, imageId })
            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error("Failed to delete")
            }

        } catch (error) {
            toast.error(`An error occurred while creating the post ${error}`);
        }


    };

    return Loading ? (
        <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
        </div>
    ) : (
        <div className="bg-gray-600 min-h-screen flex justify-center pt-20">
            <div className="bg-white min-h-screen w-1/2 rounded-2xl">
                <div className="flex justify-center items-center flex-wrap gap-4">
                    {data?.post?.photos.map((i) => (
                        <div key={i._id} className="relative group">
                            <img
                                className="m-2 w-32 h-32 object-cover rounded-lg"
                                src={i.url}
                                alt="Not available"
                            />
                            <button
                                onClick={() => handleDeleteImage(i.public_id)}
                                className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>

                <form
                    className="flex flex-col space-y-6 px-7"
                    onSubmit={handleUpdateFormSubmit}
                >
                    <div>
                        <label htmlFor="title" className="mb-2 text-lg block">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="mb-2 text-base block">
                            Description
                        </label>
                        <textarea
                            id="description"
                            placeholder="Type Message"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-4 bg-white mx-auto w-full h-full block text-sm border border-gray-400 outline-[#007bff] rounded"
                            rows="4"
                        ></textarea>
                    </div>
                    <div>
                        <label htmlFor="photos" className="mb-2 text-base block">
                            Photos
                        </label>
                        <input
                            id="photos"
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileChange}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black text-white h-10 rounded-2xl hover:bg-blue-900"
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Update;