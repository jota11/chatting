import "../styles/_chatContainer.scss";
import Icon from "@mdi/react";
import { mdiAccountArrowRight, mdiAccountBox, mdiCog, mdiDotsHorizontal } from "@mdi/js";

export const AccountDropdownMenu = () => {
    return (
        <div className="dropdown">
            <button className="dropdown-main-button dropdown-toggle" type="button" data-toggle="dropdown">
                <Icon path={mdiDotsHorizontal} size={1} />
            </button>
            <ul className="dropdown-menu">
                <button><li className="dropdown-menu-item center left" title="Settings"><Icon path={mdiCog} size={0.9} />Settings</li></button>
                <button><li className="dropdown-menu-item center left" title="Your Account"><Icon path={mdiAccountBox} size={0.9} /> Account</li></button>
                <button><li className="dropdown-menu-item center left" title="Logout"><Icon path={mdiAccountArrowRight} size={0.9} /> Logout</li></button>
            </ul>
        </div>
    );
};
