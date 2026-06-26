import Icon from "@mdi/react";
import { mdiEye, mdiEyeOutline } from "@mdi/js";
import { useState } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";
import { Link } from "react-router-dom";
import "../styles/_form.scss";

interface Props {
    email: string;
    name?: string;
    username?: string;
    password: string;
    formTitle: string;
    formDescription: string;

    isUserSigningUp: boolean;

    formAction: FormEventHandler;
    emailAction: ChangeEventHandler;
    nameAction?: ChangeEventHandler;
    usernameAction?: ChangeEventHandler;
    passwordAction: ChangeEventHandler;
}
export const Form: React.FC<Props> = ({ formAction, email, emailAction, username, usernameAction, name, nameAction, password, passwordAction, isUserSigningUp, formTitle, formDescription }) => {
    const [showPassword, setShowPassword] = useState(false);
    const passwordActionShow = () => setShowPassword(!showPassword);

    return (
        <form onSubmit={formAction} id="global-form">
            <section id="form-info">
                <h2>{formTitle}</h2>
                <p>{formDescription}</p>
            </section>
            <div className="form-entry">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Your Name Here"
                    value={email}
                    onChange={emailAction} required
                />
                <label htmlFor="email">Email</label>
            </div>
            {isUserSigningUp == true ?
                (<div className="form-entry">
                    <input
                        minLength={3}
                        maxLength={20}
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Your Username Here"
                        value={username}
                        onChange={usernameAction} required
                    />
                    <label htmlFor="username">Username</label>
                </div>)
                :
                (<></>)
            }
            {isUserSigningUp == true ?
                (<div className="form-entry">
                    <input
                        minLength={2}
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your Name Here"
                        value={name}
                        onChange={nameAction} required
                    />
                    <label htmlFor="name">Name</label>
                </div>)
                :
                (<></>)
            }
            <div className="form-entry">
                <input
                    minLength={8}
                    // if your password has over 512 characters I'm sorry
                    maxLength={512}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Your Password Here"
                    value={password}
                    onChange={passwordAction} required
                />
                <label htmlFor="password">Password</label>
                <button
                    id="btn-show-password"
                    type="button"
                    onClick={passwordActionShow}
                >
                    {showPassword ? (<span><Icon path={mdiEye} size={1} /></span>) : (<span><Icon path={mdiEyeOutline} size={1} /></span>)}
                </button>
            </div>
            <button type="submit" className="form-button-submit">
                {isUserSigningUp ? ("Create Account") : ("Login")}
            </button>
            {isUserSigningUp ?
                (<><span id="alreadyhasaccount">Already have an account? <Link to="/login">Log in!</Link></span></>)
                :
                (<><span id="alreadyhasaccount">Don't have an account? <Link to="/signup">Sign up!</Link></span></>)
            }
        </form>
    );
};
