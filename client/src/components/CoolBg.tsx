import Icon from "@mdi/react";
import { mdiChatProcessing } from "@mdi/js";
import "../styles/_coolBg.scss";

export const CoolBg = () => {
    return (
        <div className="cool-bg center column">
            <Icon path={mdiChatProcessing} size={10}/>
            <h1>Chatting<span className="blinking">|</span></h1>
        </div>
    );
};
