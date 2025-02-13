import { useState } from 'react';
import axios from 'axios';

const Download = () => {
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleDownload = async () => {
        if (!date) {
            setError('Please select a date.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Make a GET request to the /download endpoint
            const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/posts/download?date=${date}`, {
                responseType: 'blob', // Important for handling binary data (PDF)
            });

            // Create a URL for the PDF blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create a link element to trigger the download
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `posts_${date}.pdf`); // Set the file name
            document.body.appendChild(link);
            link.click();

            // Clean up
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            setError('Failed to download posts. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-600 min-h-screen flex justify-center pt-20">
            <div className="bg-white min-h-[50vh] w-1/2 rounded-2xl p-8">
                <h1 className="text-2xl font-bold text-center mb-6">Download Posts</h1>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleDownload();
                    }}
                    className="flex flex-col space-y-6"
                >
                    <div>
                        <label htmlFor="date" className="mb-2 text-lg block">
                            Select Date:
                        </label>
                        <input
                            type="date"
                            id="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-black text-white h-10 rounded-2xl hover:bg-blue-900 transition-colors"
                    >
                        {loading ? 'Downloading...' : 'Download Posts'}
                    </button>
                </form>
                {error && (
                    <p className="text-red-500 text-center mt-4">{error}</p>
                )}
            </div>
        </div>
    );
};

export default Download;