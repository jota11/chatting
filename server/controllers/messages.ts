import { type Request, type Response } from "express";
import type { MessageCreateManyInput } from "../src/generated/prisma/models.ts";
import { getReceiverSocketIds, io } from "../lib/socket.ts";
import prisma from "../lib/prisma.ts";

const errMsgHandler = (context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : "Unknown Error";
    console.error(`${context}`, msg);
}

export const getUsersFromSidebar = async (req: Request, res: Response): Promise<void> => {
    try {
        const loggedInUserId = (req as any).user.userId;
        const filteredUsers = await prisma.user.findMany({
            where: {
                NOT: {
                    userId: loggedInUserId
                },
            },
            omit: {
                email: true,
                password: true,
                updatedAt: true
            }
        });

        res.status(200).json(filteredUsers);
    } catch (err) {
        errMsgHandler("error in getUsersFromSidebar!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req: Request, res: Response): Promise<void> => {
    try {
        const senderId = parseInt((req as any).user.id);
        const receiverId = parseInt(req.params.id!);

        if (Number.isNaN(receiverId)) {
            res.status(500).json({ message: "NaN!" });
        }

        const messages = await prisma.message.findMany({
            where: {
                OR: [{
                    authorId: senderId,
                    receiverId: receiverId
                },
                {
                    authorId: receiverId,
                    receiverId: senderId
                }]
            },
            omit: {
                id: true
            }
        });

        res.status(200).json(messages);
    } catch (err) {
        errMsgHandler("error in getMessages!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageId = req.params["id"];

        if (!messageId) {
            res.status(500).json({ message: "No message ID!" });
        }

        const message = await prisma.message.findFirst({
            where: {
                messageId: messageId
            },
            omit: {
                id: true
            }
        });

        res.status(200).json(message);
    } catch (err) {
        errMsgHandler("error in getMessage!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessage = async (req: Request, res: Response): Promise<void> => {
    try {
        const senderId = (req as any).user.id;
        const receiverId = req.params["id"];
        const { text } = req.body;

        if (!receiverId) {
            res.status(400).json({ message: "Receiver is required!" });
            return;
        }

        const finding = await prisma.user.findFirst({
            where: {
                userId: receiverId
            },
            omit: {
                email: true,
                name: true,
                username: true,
                password: true,
                profilePic: true,
                isAdmin: true,
            }
        });

        if (!finding) {
            return;
        }

        const userIdFromFinding = finding.id;

        const newMessage: MessageCreateManyInput = {
            authorId: parseInt(senderId),
            receiverId: userIdFromFinding,
            content: text,
        };

        const messageR = await prisma.message.create({
            data: {
                authorId: newMessage.authorId,
                receiverId: newMessage.receiverId,
                content: newMessage.content
            }
        });

        const receiverSocketId = getReceiverSocketIds(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
            // console.log("new message!" + JSON.stringify(newMessage));
        } else {
            console.error("something went wrong at receiverSocketId it is empty :(");
        }

        res.status(201).json(messageR);
    } catch (err) {
        errMsgHandler("error in sendMessage!", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
