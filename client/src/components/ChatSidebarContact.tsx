import "../styles/_chatContainer.scss";
import type { MouseEventHandler } from "react";
// import Icon from "@mdi/react";
// import { mdiCircleSmall } from "@mdi/js";

interface Props {
    keyKey: string;
    onClickFunc: MouseEventHandler;
    contactName: string;
    contactUserId: boolean;
}

export const ChatSidebarContact: React.FC<Props> = ({
    keyKey,
    onClickFunc,
    contactName,
    contactUserId,
}) => {
    return (
        <button key={keyKey} onClick={onClickFunc} className="sidebar-contact">
            <img src={"/catthink.jpeg"} />
            <section className="sidebar-contact-info">
                 {/*<p>{contactName} {contactUserId ? <Icon path={mdiCircleSmall} size={1} /> : "OFFLINE"}</p>*/}
                <p>{contactName}</p>
                {contactUserId ? "ONLINE" : "OFFLINE"}
                {/* <Icon path={mdiCircleSmall} size={1}/> */}
            </section>
        </button>
    );
};
