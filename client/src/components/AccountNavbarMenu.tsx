import "../styles/_accountNavbarMenu.scss";
import Icon from "@mdi/react";
import { mdiAccountArrowRight, mdiAccountBox, mdiCog } from "@mdi/js";
import { AuthStore } from "../store/auth";
import { Link } from "react-router-dom";

export const AccountNavbarMenu = () => {
    const { logout } = AuthStore();

    return (
        <ul id="account-navbar-menu" className="center">
            <Link to="/settings">
            <li className="" title="Settings">
                <button>
                    <Icon path={mdiCog} size={1.25} />
                </button>
            </li>
            </Link>
            <li className="" title="Your Account">
                <button>
                    <Icon path={mdiAccountBox} size={1.25} />
                </button>
            </li>
            <li className="" title="Logout">
                <button onClick={logout}>
                    <Icon path={mdiAccountArrowRight} size={1.25} />
                </button>
            </li>
        </ul>
    );
};
