import express from "express";
import { createUser, getUser } from "../controllers/admin.js";

const app = express();

app.post("/newUser", createUser)
app.get("/getUser", getUser)

export default app;