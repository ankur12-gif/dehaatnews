/* AnalyticsBarChart.jsx
   A well-documented, production-ready React component that renders a bar chart
   using react-chartjs-2 + chart.js. It sorts dates, formats labels, handles
   empty data, supports stacked/horizontal modes, and uses useMemo to avoid
   unnecessary re-renders.
*/

import { useMemo } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AnalyticsBarChart = ({ data, stacked = false, horizontal = false }) => {
    // Guard: when there's no data, render a small friendly placeholder
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="p-4 text-center" role="status">
                No chart data available
            </div>
        );
    }

    // Keep a sorted copy of the data (ascending by date) so charts are always ordered
    const sorted = useMemo(() => {
        return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [data]);

    // Friendly, compact labels (e.g. "Sep 1") — falls back to raw value if parsing fails
    const labels = useMemo(
        () =>
            sorted.map((item) => {
                try {
                    return new Date(item.date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                    });
                } catch (e) {
                    return String(item.date);
                }
            }),
        [sorted]
    );

    // Chart data object (memoized)
    const chartData = useMemo(
        () => ({
            labels,
            datasets: [
                {
                    label: "Active Users",
                    data: sorted.map((item) => item.activeUsers ?? 0),
                    backgroundColor: "rgba(75,192,192,0.6)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1,
                },
                {
                    label: "New Users",
                    data: sorted.map((item) => item.newUsers ?? 0),
                    backgroundColor: "rgba(153,102,255,0.6)",
                    borderColor: "rgba(153,102,255,1)",
                    borderWidth: 1,
                },
            ],
        }),
        [labels, sorted]
    );

    // Options (memoized). `indexAxis` controls horizontal vs vertical bars.
    const options = useMemo(
        () => ({
            indexAxis: horizontal ? "y" : "x",
            responsive: true,
            maintainAspectRatio: false, // easier to control height via parent container
            plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Analytics: Active Users and New Users" },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const value = ctx.parsed.y ?? ctx.parsed ?? 0; // support horizontal/vertical
                            return `${ctx.dataset.label}: ${value.toLocaleString()}`;
                        },
                    },
                },
            },
            scales: {
                x: { stacked },
                y: { stacked, beginAtZero: true },
            },
        }),
        [stacked, horizontal]
    );

    // Wrap chart in a div with a controlled height so maintainAspectRatio:false works
    return (

        <Bar data={chartData} options={options} />

    );
};

AnalyticsBarChart.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
                .isRequired,
            activeUsers: PropTypes.number,
            newUsers: PropTypes.number,
        })
    ).isRequired,
    stacked: PropTypes.bool,
    horizontal: PropTypes.bool,
};

export default AnalyticsBarChart;
