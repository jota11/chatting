import Icon from "@mdi/react";
import "../styles/_chatContainer.scss";
import { mdiChatProcessing } from "@mdi/js";

export const NoChatSelected = () => {
    return (
        <section id="chat-container-no-chat-selected">
            <Icon path={mdiChatProcessing} size={10} />
            <p>WELCOME TO CHATTING!</p>
            <p>Select a contact to start chatting</p>
        </section>
    );
};
