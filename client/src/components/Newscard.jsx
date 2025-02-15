/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Newscard = ({
    title,
    link,
    description,
    pubDate,
    sourceId,
    creator,
    imageUrl,
}) => {
    return (
        <div className="p-4 border-b border-gray-300 relative">
            {" "}
            {/* Added `relative` for positioning context */}
            {/* Source ID in Top-Right Corner */}
            <div className=" absolute top-2 right-4 bg-red-800 text-white px-2 py-1 rounded-lg text-sm">
                {sourceId}
            </div>
            {/* Title */}
            <div className="font-extrabold text-xl mb-3 mt-8">{title}</div>{" "}
            {/* Added `mt-8` to account for the sourceId */}
            {/* Image */}
            <div className="w-full overflow-hidden rounded-lg">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-auto object-cover"
                />
            </div>
            {/* Description and Metadata */}
            <div className="mt-4">
                <span className="font-bold text-lg">{description}</span>
                <br />
                <span className="mt-2 text-sm text-gray-600">
                    by {creator} on {new Date(pubDate).toUTCString()}
                </span>
            </div>
            {/* Read More Button */}
            <div className="mt-7 flex justify-end">
                <Link
                    className="bg-blue-700 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-950 hover:font-bold transition-all duration-300 text-sm sm:text-base"
                    to={link}
                >
                    READ MORE
                </Link>
            </div>
        </div>
    );
};

export default Newscard;
