/* eslint-disable react/prop-types */

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
        <div className="p-4 border-b border-gray-300">
            {/* Title */}
            <div className="font-extrabold text-xl mb-3">{title}</div>

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
            <div className="mt-7 flex justify-center">
                <a
                    className="bg-blue-950 text-white px-6 py-2 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    READ MORE
                </a>
            </div>
        </div>
    );
};

export default Newscard;