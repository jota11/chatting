import { type Request, type Response } from "express";
import { generateToken } from "../lib/utils.ts";
import type { UserCreateInput } from "../src/generated/prisma/models/User.ts";
import bcrypt from "bcryptjs";
import prisma from "../lib/prisma.ts";

export class AuthController {
    static async signup(req: Request, res: Response): Promise<void> {
        const { name, username, email, password, profilePic } = req.body;

        try {
            if (!username || !email || !name || !password) {
                res.status(400).json({ message: "All fields must be filled!" });
            }

            if (password.length < 8) {
                res.status(400).json({ message: "Password must be at least 8 characters long." });
            }

            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (user) {
                res.status(400).json({ message: "This email is already being used" });
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(password, salt);

            const newUser: UserCreateInput = {
                name,
                username,
                email,
                password: hashedPass,
                profilePic: profilePic || "/default_avatar.jpg"
            };

            if (newUser) {
                generateToken(newUser.username, res);

                await prisma.user.create({
                    data: {
                        name: newUser.name,
                        username: newUser.username,
                        email: newUser.email,
                        profilePic: newUser.profilePic,
                        password: newUser.password,
                    }
                });
                res.status(201).json({
                    name: newUser.name,
                    username: newUser.username,
                    email: newUser.email
                });
            } else {
                res.status(400).json({ message: "Invalid user data" });
            }

        } catch (error) {
            console.error("signup error! " + error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
    static async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        try {
            const user = await prisma.user.findUnique({
                where: { email: email }
            });

            if (!user) return;

            const isPassCorrect = await bcrypt.compare(password, user.password);

            if (!user || !isPassCorrect) {
                res.status(400).json({ message: "Invalid credentials" });
                return;
            }

            generateToken(user.username, res);

            res.status(200).json({
                name: user.name,
                username: user.username,
                email: user.email,
                profilePic: user.profilePic,
            });
        } catch (err) {
            console.error("login error! " + err);
            res.status(500).json({ message: "Internal Server Esrror" });
        }
    }
    static async logout(req: Request, res: Response): Promise<void> {
        try {
            res.cookie("chattingJwt", "", { maxAge: 0 })
            res.status(200).json({ message: "Logged out successfully" });
        } catch (err) {
            console.error("logout error! " + err);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    static async checkAuthentication(req: Request, res: Response): Promise<void> {
        try {
            res.status(200).json((req as any).user);
        } catch (error) {
            console.error("checkAuthentication error! " + error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    }
}

export const authController = new AuthController();
