import { useFileHandler } from "6pp";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCreateSponsorsMutation } from "../redux/api/sponsorsApi";

const Createsponsors = () => {
    const { user } = useSelector((state) => state.user);

    const [name, setName] = useState("");

    const navigate = useNavigate();

    const [newSponsor, { isLoading }] = useCreateSponsorsMutation();

    const photos = useFileHandler("multiple", 5);

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!name) {
            toast.error("Enter all fields");
            return;
        }

        if (!photos.file || photos.file.length === 0) {
            toast.error("Please select at least one photo");
            return;
        }

        const formData = new FormData();
        formData.set("name", name);

        // Append each file to the FormData
        photos.file.forEach((file) => {
            formData.append("photos", file);
        });

        try {
            // Call the mutation function
            const res = await newSponsor({ id: user._id, sponsorData: formData });

            if (res.data?.success) {
                toast.success("Sponsor created successfully");
                navigate("/sponsors");
            } else {
                toast.error("Failed to create sponsor");
            }
        } catch (error) {
            toast.error(`An error occurred while creating the sponsor ${error}`);
        }
    };

    return (
        <div className="bg-gray-600 pt-20 min-h-screen flex flex-col items-center justify-center p-4">
            {/* Image Preview Section with Swiper */}
            <div className="bg-white h-96 w-full md:w-1/2 rounded-lg mb-4 flex items-center justify-center p-4 overflow-hidden">
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
                                    className="w-full h-full object-contain rounded-lg"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <p className="text-center">No images selected</p>
                )}
            </div>

            {/* Form Section */}
            <div className="bg-white w-full md:w-1/2 text-black font-bold p-6 rounded-lg">
                <form className="flex flex-col space-y-6" onSubmit={handleFormSubmit}>
                    <div>
                        <label className="mb-2 text-lg block">Name</label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                        />
                    </div>


                    <div>
                        <label className="mb-2 text-base block">Photos</label>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            required
                            onChange={photos.changeHandler}
                            className="w-auto bg-gray-300 p-1 hover:bg-gray-700 hover:text-white rounded-2xl"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-black text-white h-12 rounded-2xl hover:bg-blue-900 transition-colors duration-300"
                    >
                        {isLoading ? "Creating..." : "Create"}
                    </button>
                </form>
            </div>
        </div>)
}

export default Createsponsors