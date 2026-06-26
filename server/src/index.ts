import express from "express";
import dotenv from "dotenv";
import authRoutes from "../routes/auth.route.ts";
import messageRoutes from "../routes/message.route.ts";
import userRoutes from "../routes/user.route.ts";
import prisma from "../lib/prisma.ts";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app, httpServer } from "../lib/socket.ts"

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/user", userRoutes);

httpServer.listen(PORT, () => {
    console.log("server running on port: " + PORT);
    prisma;
});
