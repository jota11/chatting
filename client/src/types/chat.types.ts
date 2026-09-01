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

    getUsers: () => Promise<void>;
    getMessages: (userId: number) => Promise<void>;
    sendMessage: (messageData: ISendMessage) => Promise<void>;
    subscribeToMessages: () => void;
    unsubscribeFromMessages: () => void;
    setSelectedUser: (selectedUser: IChatUser | null) => void;
}
