/* eslint-disable react/prop-types */

import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsLineChart = ({ data }) => {
    // Prepare chart data
    const chartData = {
        labels: data.map((item) => item.date), // X-axis labels
        datasets: [
            {
                label: "Active Users",
                data: data.map((item) => item.activeUsers),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
                tension: 0.4,
            },
            {
                label: "New Users",
                data: data.map((item) => item.newUsers),
                borderColor: "rgba(153,102,255,1)",
                backgroundColor: "rgba(153,102,255,0.2)",
                fill: true,
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Analytics: Active Users and New Users Over Time",
            },
        },
        scales: {
            x: {
                title: { display: true, text: "Date" },
            },
            y: {
                title: { display: true, text: "Count" },
                beginAtZero: true,
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default AnalyticsLineChart;
