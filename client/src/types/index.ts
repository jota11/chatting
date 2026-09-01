//auth
export interface IAuthUser {
    // id: string;
    id: number;
    email: string;
    name: string;
    username: string;
    description?: string;
    profilePic?: string;
}

export interface ISignUp {
    email: string;
    name: string;
    username: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface AuthState {
    onlineUsers: string[];
    authUser: IAuthUser | null;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    socket: Socket | null;

    // checkAuth: () => Promise<void>;
    // signup: (data: ISignUp) => Promise<void>;
    login: (data: ILogin) => Promise<void>;
    // logout: () => Promise<void>;
    connectSocket: () => void;
    disconnectSocket: () => void;
}



//chat
export interface IChatUser {
    // id: string;
    id: number;
    name: string;
    email: string;
    // userId: number;
    userId: string;
}

export interface IMessage {
    messageId: string;
    authorId: number;
    receiverId: number;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface ISendMessage {
    text: string;
}

export interface ChatState {
    messages: IMessage[];
    users: IChatUser[];
    selectedUser: IChatUser | null;
    isUsersLoading: boolean;
    isMessagesLoading: boolean;
}
