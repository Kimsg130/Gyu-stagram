import React from "react";

import "./style.css";

interface Props {
    label: string;
    primary?: boolean;
    sendingComment?: () => void;
    disable?: boolean;
}
export default function Button({ label, primary, sendingComment, disable }: Props) {
    if (primary) {
        return <div className="button primary-button hoverable" onClick={sendingComment}>{label}</div>;
    } else {
        if (disable) {
            return <div className="button secondary-button disable" draggable>{label}</div>;
        } else {
            return <div className="button secondary-button hoverable" onClick={sendingComment}>{label}</div>;
        }
    }
}