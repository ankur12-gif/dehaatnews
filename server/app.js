import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB, hashPassword } from "./src/utils/features.js";
import userRoute from "./src/routes/admin.js";
import postsRoute from "./src/routes/post.js";
import sponsorsRoute from "./src/routes/sponsor.js";
import { v2 as cloudinary } from "cloudinary";
import morgan from "morgan";
import NodeCache from "node-cache";
import path from "path";
import fs from "fs";

dotenv.config({ path: "./.env" });

const app = express();
const PORT = process.env.PORT;
export let AdminPassKey;

export const jwtSecret = process.env.JWT_SECRET;
export const TTL = process.env.TIME_TO_LIVE;
export const envMode = process.env.NODE_ENV || "PRODUCTION";
const mongoUri = process.env.MONGO_URI;
export const myCache = new NodeCache();

console.log(process.env.CLIENT_URL);

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

app.get("/", (req, res) => {
    res.send("Hello World");
});

// ✅ Serve Dynamic Open Graph Meta Tags for News Articles
app.get("/news/:id", async (req, res) => {
    const { id } = req.params;

    // Simulate fetching news article from the database
    const newsArticle = {
        title: `Breaking News #${id}`,
        description: `Read the latest news article #${id} only on Dehaat News.`,
        image: `https://dehaatnews.com/news-image-${id}.jpg`,
        url: `https://dehaatnews.com/news/${id}`,
    };

    const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${newsArticle.title}</title>
        <meta name="description" content="${newsArticle.description}">
        <meta property="og:title" content="${newsArticle.title}">
        <meta property="og:description" content="${newsArticle.description}">
        <meta property="og:image" content="${newsArticle.image}">
        <meta property="og:url" content="${newsArticle.url}">
        <meta property="og:type" content="article">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${newsArticle.title}">
        <meta name="twitter:description" content="${newsArticle.description}">
        <meta name="twitter:image" content="${newsArticle.image}">
      </head>
      <body>
        <script>
          window.location.href = "${newsArticle.url}";
        </script>
      </body>
    </html>`;

    res.send(htmlTemplate);
});

// ✅ Serve React Frontend
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

const initializeServer = async () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.CLOUD_API_KEY,
            api_secret: process.env.CLOUD_API_SECRET,
        });
        AdminPassKey = await hashPassword(process.env.ADMIN_PASS_KEY);

        await connectToMongoDB(mongoUri);

        app.use("/api/v1/user", userRoute);
        app.use("/api/v1/posts", postsRoute);
        app.use("/api/v1/sponsors", sponsorsRoute);

        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        });
    } catch (error) {
        console.error("Error initializing server:", error);
    }
};

initializeServer();
