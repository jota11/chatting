import jwt from "jsonwebtoken";
import { type Request, type Response } from "express";
import prisma from "../lib/prisma.ts";

export const protectRoute = async (req: Request, res: Response, next: () => void) => {
    try {
        const token = req.cookies.chattingJwt;

        if (!token) res.status(401).json({ message: "Unauthorized - No Token" });

        let JWTTOKEN: string;

        if (process.env.JWT_TOKEN) {
            JWTTOKEN = process.env.JWT_TOKEN
        } else {
            console.error("JWT_TOKEN environment variable is empty. Populate that field in the .env file with your desired value.");
            throw new Error("JWT_TOKEN environment variable is empty. Populate that field in the .env file with your desired value.");
        }

        const decoded = jwt.verify(token, JWTTOKEN);
        const decodedUsername = (decoded as jwt.JwtPayload).userId;

        if (!decoded) {
            res.status(498).json({ message: "Unauthorized - Invalid or Expired Token" });
        }

        const user = await prisma.user.findUnique({
            where: {
                username: decodedUsername,
            },
            omit: {
                password: true
            }
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
        }

        (req as any).user = user;

        next();
    } catch (error) {
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            res.status(500).json({ message: error });
            console.error("protectRoute error in auth_middleware! " + error);
        } else {
            console.error("Error");
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}
