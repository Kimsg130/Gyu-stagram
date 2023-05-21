import React from "react";

import "./style.css";

interface Props {
    label: string;
    primary?: boolean;
    clickFunction?: () => void;
    disable?: boolean;
}
export default function Button({ label, primary, clickFunction, disable }: Props) {
    if (primary) {
        return (
            <div className="button primary-button hoverable" onClick={clickFunction} draggable >{label}</div>
        );
        //<div className="button primary-button hoverable" onClick={clickFunction} draggable >{label}</div>
    } else {
        if (disable) {
            return <div className="button secondary-button disable" draggable>{label}</div>;
        } else {
            return <div className="button secondary-button hoverable" onClick={clickFunction}>{label}</div>;
        }
    }
}