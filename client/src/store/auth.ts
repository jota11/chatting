import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import type { AxiosResponse } from "axios";
import type { IAuthUser, ISignUp, ILogin, AuthState } from "../types/index.ts";
import { SOCKET_URL, errMsgHandler } from "../consts.ts";

export const AuthStore = create<AuthState>((set, get) => ({
    onlineUsers: [],
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,

    checkAuth: async() => {
        try {
            const res: AxiosResponse<IAuthUser> = await axiosInstance.get("/auth/check");
            set({ authUser: res.data });
            get().connectSocket();
        } catch (err) {
            set({ authUser: null });
            errMsgHandler(err, "error checking auth!");
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async(data: ISignUp) => {
        set({ isSigningUp: true });
        try {
            const res: AxiosResponse<IAuthUser> = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            if (res.status == 201) {
                toast.success("Account created!");
            } else {
                toast.error("Error while signing up!");
            }
            get().connectSocket();
        } catch (err) {
            errMsgHandler(err, "error signing up!");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async(data: ILogin) => {
        set({ isLoggingIn: true });
        try {
            const res: AxiosResponse<IAuthUser> = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            if (res.status === 200) {
                toast.success("Signed in!");
            } else {
                toast.error("Email or password may be incorrect!");
            }
            get().connectSocket();
        } catch (err) {
            errMsgHandler(err, "error logging up!");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async() => {
        try {
            await axiosInstance.post("/auth/logout");
            set({ authUser: null });
            toast.success("Logged out!");
            get().disconnectSocket();
        } catch (err) {
            errMsgHandler(err, "error logging out!");
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();

        if (!authUser || socket?.connected) return;

        const newSocket: Socket = io(SOCKET_URL, {
            query: {
                userId: authUser.id,
                autoConnect: false
            }
        });

        newSocket.connect();
        set({ socket: socket });

        newSocket.on("getOnlineUsers", (userIds: string[]) => {
            set({ onlineUsers: userIds });
        });

    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    }

}));
