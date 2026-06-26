import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173"]
    }
});

let userSocketMap: Record<string, Set<string>> = {};
// console.log("userSocketMap " + userSocketMap);

export function getReceiverSocketIds(userId: string | undefined): string[] {
    if (!userId) return [];
    const sockets = userSocketMap[userId];
    return sockets ? Array.from(sockets) : [];
}

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId as string;
    console.log("[SOCKET_CONN] userId: " + userId);

    if (!userId) {
        console.log("[SOCKET_CONN] Connection rejected: userId is missing");
        socket.disconnect();
        return;
    }

    if (!userSocketMap[userId]) {
        userSocketMap[userId] = new Set();
    }

    userSocketMap[userId].add(socket.id);
    console.log("[SOCKET_CONN] User connected: " + userId + " // " + socket.id);

    const broadcastOnlineUsers = () => {
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("[SOCKET_UPDT] Online users: " + Object.keys(userSocketMap));
    };

    broadcastOnlineUsers();

    socket.on("disconnect", () => {
        const userSockets = userSocketMap[userId];
        if (userSockets) {
            userSockets.delete(socket.id);
            if (userSockets.size === 0) {
                delete userSocketMap[userId];
            }
        }
        console.log("[SOCKET_CONN] User disconnected: " + userId + socket.id);
        broadcastOnlineUsers();
    });
});

export { io, app, httpServer }
