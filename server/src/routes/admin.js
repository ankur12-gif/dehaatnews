import express from "express";
import { createUser, loginUser } from "../controllers/admin.js";

const app = express();

app.post("/newUser", createUser)
app.get("/loginUser", loginUser)

export default app;