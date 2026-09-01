import { axiosInstance } from "../lib/axios";
// import toast from "react-hot-toast";
import { AuthStore } from "./auth";
import type { AxiosResponse } from "axios";
import { create } from "zustand";
import type { IChatUser, IMessage, ISendMessage, ChatState } from "../types/index.ts";
import { errMsgHandler } from "../consts.ts";

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
            // const currentSelectedUser = get().selectedUser;
            // console.log("currentSelectedUser: ", currentSelectedUser);

            const isMessageFromSelectedUser = newMessage.authorId === selectedUser.id;
            // console.log("newMessage userId: ", selectedUser.userId);
            // console.log("newMessage authorId: ", newMessage.authorId);
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

    setSelectedUser: (selectedUser: any) => {
        set({ selectedUser });
    }
}));
