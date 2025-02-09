import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sponsers = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5); // Timer starts from 5 seconds

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/home");
        }, 5000);

        const interval = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval); // Cleanup interval
        };
    }, [navigate]);

    return (
        <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
            <h1 className="font-bold text-2xl p-10">Special thanks</h1>
            <h1 className="font-extrabold text-7xl">Sponsers</h1>
            <div className="timer text-4xl font-bold mt-6">
                Redirecting in {countdown}...
            </div>
        </div>
    );
};

export default Sponsers;
