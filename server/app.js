import express from "express";
import cors from "cors";
import dotenv from "dotenv";


dotenv.config({ path: "./.env" })

const app = express();

app.use(cors("*"));



const PORT = process.env.PORT
export const AdminPassKey = process.env.ADMIN_PASS_KEY;
export const envMode = process.env.NODE_ENV;

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
