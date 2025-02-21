import { FaSquareXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Contactus = () => {
    return (
        <div className="bg-gray-600 text-white min-h-screen flex flex-col items-center justify-center p-4 overflow-auto mt-10 sm:mt-0">
            {/* Heading */}
            <div className="text-3xl sm:text-4xl font-bold mb-4 text-center">
                Vision
            </div>

            {/* Content */}
            <div className="max-w-4xl w-full text-base sm:text-lg leading-relaxed text-justify p-4 sm:p-6 rounded-lg shadow-lg">
                देहात न्यूज में आपका स्वागत है। यहां हम मानते हैं कि हर आवाज मायने रखती
                है। हमारे देहाती जीवन में अनगिनत अनकही कहानियां हैं। संघर्ष, हिम्मत और
                उम्मीद की कहानियां। शिक्षा की कमी, जल संकट, सड़कों का विकास, परिवहन की
                समस्याएं। हम यहां उन रोजमर्रा के समस्याओं की आवाज को बुलंद करने आए हैं
                जो अक्सर अनसुनी रह जाती हैं। हम आपके गांव-देहात और कस्बों की समस्याओं को
                उजागर करेंगे, यह सुनिश्चित करेंगे कि आपकी चिंताएं उन तक पहुंचे जो बदलाव
                ला सकते हैं। आइए मिलकर जागरूकता बढ़ाएं, सरकार को कार्रवाई के लिए प्रेरित
                करें और ठोस समाधान की ओर कदम बढ़ाएं। बदलाव का समय आ गया है और यह शुरुआत
                आपसे होती है। देहात न्यूज से जुड़े रहें—जहां आपकी कहानी मायने रखती है।
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-x-6 mt-6">
                <a href="https://x.com/Dehaatnews14923?t=GU4594yz6FZNpwbQF8Q-Kw&s=08" target="_blank" rel="noopener noreferrer">
                    <FaSquareXTwitter className="text-3xl sm:text-4xl text-black hover:text-blue-700 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://www.facebook.com/profile.php?id=61573410870548&mibextid=wwXIfr&mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                    <FaFacebook className="text-3xl sm:text-4xl text-black hover:text-blue-900 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="https://youtube.com/@khuntiupdates?si=JJIFZ2OOpTr96_qO" target="_blank" rel="noopener noreferrer">
                    <FaYoutube className="text-3xl sm:text-4xl text-black hover:text-red-800 hover:scale-110 transition-transform duration-300" />
                </a>
                <a href="mailto:dehaatnews@gmail.com">
                    <MdEmail className="text-3xl sm:text-4xl text-black hover:text-gray-500 hover:scale-110 transition-transform duration-300" />
                </a>
            </div>
        </div>
    );
};

export default Contactus;
