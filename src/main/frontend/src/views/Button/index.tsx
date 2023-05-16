import React from "react";

import "./style.css";

interface Props {
    label: string;
    primary?: boolean;
    sendingComment?: () => void;
}
export default function Button({ label, primary, sendingComment }: Props) {
    if (primary) {
        return <div className="button primary-button hoverable" onClick={sendingComment}>{label}</div>;
    } else {
        return <div className="button secondary-button hoverable" onClick={sendingComment}>{label}</div>;
    }
}