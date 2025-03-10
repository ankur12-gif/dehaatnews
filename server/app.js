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

dotenv.config({ path: "./.env" });

const app = express();

const PORT = process.env.PORT;
export let AdminPassKey;

export const jwtSecret = process.env.JWT_SECRET;
export const TTL = process.env.TIME_TO_LIVE;
export const envMode = process.env.NODE_ENV || "PRODUCTION";
const mongoUri = process.env.MONGO_URI;
export const myCache = new NodeCache();

console.log("Allowed Client URL:", process.env.CLIENT_URL);

const corsOptions = {
    origin: [
        "http://localhost:5173",
        "http://localhost:4173",
        process.env.CLIENT_URL,
    ],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));

// ✅ Ensure Express Parses JSON Correctly with UTF-8
app.use(express.json({ limit: "10mb", type: "application/json", charset: "utf-8" }));

// ✅ Set Headers for UTF-8 Encoding Globally
app.use((req, res, next) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Access-Control-Allow-Origin", process.env.CLIENT_URL || "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.get("/", (req, res) => {
    res.send("Hello World");
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

        // ✅ Ensure Routes Handle UTF-8 Data Correctly
        app.use("/api/v1/user", userRoute);
        app.use("/api/v1/posts", postsRoute);
        app.use("/api/v1/sponsors", sponsorsRoute);

        // ✅ Debugging: Log Incoming Hindi Text
        app.use((req, res, next) => {
            if (req.body && typeof req.body === "object") {
                console.log("🔍 Incoming Request Data:", JSON.stringify(req.body, null, 2));
            }
            next();
        });

        app.listen(PORT, () => {
            console.log(`🚀 App is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Error initializing server:", error);
    }
};

initializeServer();
