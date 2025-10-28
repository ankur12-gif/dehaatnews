import AnalyticsLineChart from "../components/Linechart.jsx";
import AnalyticsBarchart from "../components/Barchart.jsx";
import { useGetAllAnalyticsDataQuery } from "../redux/api/analyticsApi";

const Analytics = () => {
    const { data, error, isLoading } = useGetAllAnalyticsDataQuery();
    console.log(data);

    if (isLoading)
        return <p className="text-center mt-8 text-gray-600">Loading chart...</p>;
    if (error)
        return <p className="text-center mt-8 text-red-600">Error loading data</p>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-600">
            <div className="bg-gray-200 shadow-lg rounded-lg w-full max-w-4xl mt-30 mb-10 ">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center pt-5">
                    Analytics Dashboard
                </h2>
                <div className="w-full h-96">
                    <AnalyticsLineChart data={data} />
                </div>
                <div className="w-full h-96">
                    <AnalyticsBarchart data={data} />
                </div>
            </div>
        </div>
    );
};

export default Analytics;
