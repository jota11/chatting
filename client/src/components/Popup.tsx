import { useState } from "react";
import "../styles/_message.scss";

interface Props {
    popupLevel: string;
    // popupTitle: string;
    popupMessage: string;
    popupButtonsChoice: boolean;
}

export const Popup: React.FC<Props> = ({ popupLevel, popupMessage, popupButtonsChoice }) => {
    const [showPopup, setShowPopup] = useState(false)
    let popupVisibility: string;
    if (!showPopup) {
        popupVisibility = "hidden"
    } else {
        popupVisibility = " "
    }

    return (
        <div id="popup-holder" className={`${popupVisibility} center`}>
            <div id="popup-window" className={`${popupLevel}`}>
                {/* {popupTitle} */}
                <div id="popup-message">
                    {popupMessage}
                </div>
                {popupButtonsChoice == true ?
                    (<section id="popup-window-buttons-holder">
                        <button className="yes">Yes</button>
                        <button className="no">No</button>
                    </section>)
                    :
                    (<section id="popup-window-buttons-holder">
                        <button onClick={() => setShowPopup(false)}>Close</button>
                    </section>)
                }
            </div>
        </div>
    );
};
