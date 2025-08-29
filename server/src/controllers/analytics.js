import { google } from "googleapis";
import { GA4_PROPERTYID } from "../../app.js";


const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json", // path to your downloaded JSON key
    scopes: "https://www.googleapis.com/auth/analytics.readonly",
});

const analyticsData = google.analyticsdata("v1beta");

export const GetAnalyticsData = async (req, res) => {
    try {

        const authClient = await auth.getClient();
        const response = await analyticsData.properties.runReport({
            auth: authClient,
            property: `properties/${GA4_PROPERTYID}`, // replace with your GA4 property id
            requestBody: {
                dimensions: [{ name: "date" }],
                metrics: [{ name: "activeUsers" }],
                dateRanges: [{ startDate: "7daysAgo", endDate: "today" }],
            },
        });

        res.json(response.data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch analytics" });
    }
}