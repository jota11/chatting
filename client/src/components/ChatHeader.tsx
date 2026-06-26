import { ChatStore } from "../store/chat"
import { AuthStore } from "../store/auth";
import "../styles/_chatContainer.scss";
import Icon from "@mdi/react";
import { mdiClose } from "@mdi/js";

export const ChatHeader = () => {
    const { selectedUser, setSelectedUser } = ChatStore();
    const { onlineUsers } = AuthStore();
    
    if (!selectedUser) {
        return;
    }
    return (
        <section id="chat-header" className="center">
            <div className="contact-info center">
                <img src={"/catthink.jpeg"}/>
                <p>{selectedUser.name}</p>
            </div>
            {onlineUsers.includes(String(selectedUser.id)) ? "online" : "offline"}
            <button onClick={() => setSelectedUser(null)}>
                <Icon path={mdiClose} size={1}/>
            </button>
        </section>
    );
};
