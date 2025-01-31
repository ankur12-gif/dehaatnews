import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToMongoDB } from "./src/utils/features.js";
import userRoute from "./src/routes/admin.js"



dotenv.config({ path: "./.env" })

const app = express();

app.use(cors("*"));
app.use(express.json());



const PORT = process.env.PORT
export const AdminPassKey = process.env.ADMIN_PASS_KEY;
export const envMode = process.env.NODE_ENV;
const mongoUri = process.env.MONGO_URI;

connectToMongoDB(mongoUri)

app.use("/api/v1/user", userRoute)


app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
