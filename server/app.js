import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB, hashPassword } from "./src/utils/features.js";
import userRoute from "./src/routes/admin.js";
import postsRoute from "./src/routes/post.js";
import sponsorsRoute from "./src/routes/sponsor.js";
import ImageKit from "imagekit";
import morgan from "morgan";
import NodeCache from "node-cache";
import axios from "axios";

dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT;
export let AdminPassKey;

export const jwtSecret = process.env.JWT_SECRET;
export const TTL = process.env.TIME_TO_LIVE;
export const envMode = process.env.NODE_ENV || "PRODUCTION";
const mongoUri = process.env.MONGO_URI;
export const myCache = new NodeCache();

console.log("CLIENT_URL:", process.env.CLIENT_URL);

// Setup CORS
const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
    ],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Initialize ImageKit
export const imagekit = new ImageKit({
    publicKey: process.env.PUBLIC_KEY,
    privateKey: process.env.PRIVATE_KEY,
    urlEndpoint: process.env.URL_ENDPOINT,
});

// 🔹 Open Graph Meta Route for Social Sharing
app.get("/viewfull/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const apiResponse = await axios.get(`${process.env.CLIENT_URL}/api/v1/posts/${id}`);

        if (!apiResponse.data.success) {
            return res.status(404).send("Article not found");
        }

        const post = apiResponse.data.post;

        // Fallbacks + escape to avoid HTML breakage
        const title = escapeHTML(post.title || "Untitled Post");
        const description = escapeHTML(post.description || "Read this article on Dehaat News.");
        const imageUrl =
            post.imageUrl ||
            post.photos?.[0]?.url ||
            "https://dehaatnews.com/dehaatnews.png"; // your fallback image

        const ogMetaTags = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title} - Dehaat News</title>

            <!-- Open Graph Tags -->
            <meta property="og:title" content="${title}" />
            <meta property="og:description" content="${description}" />
            <meta property="og:image" content="${imageUrl}" />
            <meta property="og:image:secure_url" content="${imageUrl}" />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="https://dehaatnews.com/viewfull/${id}" />

            <!-- Twitter -->
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="${title}" />
            <meta name="twitter:description" content="${description}" />
            <meta name="twitter:image" content="${imageUrl}" />

            <!-- Redirect to frontend after preview -->
            <script>
                window.location.href = "https://dehaatnews.com/news/${id}";
            </script>
        </head>
        <body></body>
        </html>
        `;

        res.send(ogMetaTags);
    } catch (error) {
        console.error("Error in /viewfull/:id:", error.message);
        res.status(500).send("Server Error");
    }
});

// Escape HTML for safe meta output
function escapeHTML(str) {
    return str
        ?.replace(/&/g, "&amp;")
        ?.replace(/</g, "&lt;")
        ?.replace(/>/g, "&gt;")
        ?.replace(/"/g, "&quot;")
        ?.replace(/'/g, "&#039;");
}

// Initialize MongoDB and Start Server
const initializeServer = async () => {
    try {
        AdminPassKey = await hashPassword(process.env.ADMIN_PASS_KEY);

        await connectToMongoDB(mongoUri);

        app.use("/api/v1/user", userRoute);
        app.use("/api/v1/posts", postsRoute);
        app.use("/api/v1/sponsors", sponsorsRoute);

        app.listen(PORT, () => {
            console.log(`🚀 App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error initializing server:", error);
    }
};

initializeServer();
