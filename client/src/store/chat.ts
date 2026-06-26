import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { AuthStore } from "./auth";
import type { AxiosResponse } from "axios";
import { create } from "zustand";

interface IChatUser {
    // id: string;
    id: number;
    name: string;
    email: string;
    // userId: number;
    userId: string;
}

interface IMessage {
    messageId: string;
    authorId: number;
    receiverId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

interface ISendMessage {
    text: string;
}

interface ChatState {
    messages: IMessage[];
    users: IChatUser[];
    selectedUser: IChatUser | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;

    getUsers: () => Promise<void>;
    getMessages: (userId: number) => Promise<void>;
    sendMessage: (messageData: ISendMessage) => Promise<void>;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    setSelectedUser: (selectedUser: IChatUser | null) => void;
}

const errMsgHandler = (context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : "Unknown Error";
    console.error(`${context}`, msg);
    toast.error("Error!" + context);
}

export const ChatStore = create<ChatState>((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({ isUsersLoading: true });
        try {
            const res: AxiosResponse<IChatUser[]> = await axiosInstance.get("/user/users");
            set({ users: res.data });
        } catch (err) {
            errMsgHandler("getUsers error!", err);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async(userId: number) => {
        set({ isMessagesLoading: true });
        try {
            const res: AxiosResponse<IMessage[]> = await axiosInstance.get(`/messages/${userId}`);
            set({ messages: res.data });
        } catch (err) {
            errMsgHandler("getMessages error!", err);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async(messageData: ISendMessage) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser.userId}`, messageData)
            set({ messages: [...messages, res.data] });
        } catch (err) {
            errMsgHandler("sendMessage error!", err);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser, messages } = get();
        const socket = AuthStore.getState().socket;

        if (!selectedUser || !socket) {
            return;
        }

        socket.off("newMessage");

        socket.on("newMessage", (newMessage: IMessage) => {
            const currentSelectedUser = get().selectedUser;
            console.log("currentSelectedUser: " + currentSelectedUser);

            const isMessageFromSelectedUser = newMessage.authorId === selectedUser.userId;
            // console.log("newMessage userId: " + selectedUser.userId);
            // console.log("newMessage authorId: " + newMessage.authorId);
            if (!isMessageFromSelectedUser) {
                return;
            }
            set({ messages: [...messages, newMessage] });
        });
    },

    unsubscribeFromMessages: () => {
        const socket = AuthStore.getState().socket;
        if (!socket) {
            return;
        }
        socket.off("newMessage");
    },

    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
    }
}));
