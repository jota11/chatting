import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io, Socket } from "socket.io-client";
import type { AxiosResponse } from "axios";

interface IAuthUser {
    // id: string;
    id: number;
    email: string;
    name: string;
    username: string;
    description?: string;
    profilePic?: string;
}

interface ISignUp {
    email: string;
    name: string;
    username: string;
    password: string;
}

interface ILogin {
    email: string;
    password: string;
}

interface AuthState {
    onlineUsers: string[];
    authUser: IAuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    socket: Socket | null;

    checkAuth: () => Promise<void>;
    signup: (data: ISignUp) => Promise<void>;
    login: (data: ILogin) => Promise<void>;
    logout: () => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}

const errMsgHandler = (context: string, err: unknown) => {
    const msg = err instanceof Error ? err.message : "Unknown Error";
    console.error(`${context}`, msg);
    toast.error("Error!" + context);
}

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
            console.error("Error checking auth! No user logged in! " + err);
            // errMsgHandler("error checking auth!", err);
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
            errMsgHandler("error signing up!", err);
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
            errMsgHandler("error logging up!", err);
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
            errMsgHandler("error logging out!", err);
        }
    },

    connectSocket: () => {
        const { authUser, socket } = get();

        if (!authUser || socket?.connected) return;

        const newSocket: Socket = io("http://localhost:5001", {
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

        console.log("[USERIDS] ", authUser);
    },

    disconnectSocket: () => {
        const { socket } = get();
        if (socket?.connected) {
            socket.disconnect();
            set({ socket: null });
        }
    }

}));
