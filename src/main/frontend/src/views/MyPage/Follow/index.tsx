import React, {useEffect, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import "./style.css";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "../../Button";
import {ImageListItem} from "@mui/material";
import FollowCard from "./FollowCard";

interface Props {
    handleClose: () => void;
    userid : string | null;
    isWing : boolean;
}

interface Follows {
    userId : string;
    f_id : number;
}

const Follow = ( props: Props ) => {
    const [follows, setFollows] = useState<Follows[]>([]);
    const [cancel, setCancel] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8082/getfollows', {
            params : {
                userId: props.userid,
                isWing: props.isWing
            }
        })
            .then(response => {
                setFollows(response.data);
                console.log(response.data);

            })
            .catch(error => console.log(error))
    }, [cancel]);

    const handleCancel = () => {
        setCancel(!cancel);
    }

    return (
        <div className={"modal-container"}>
            <div className={"close-area"} onClick={() => props.handleClose()}>
                <div className={"close-modal hoverable"}>
                    <CloseIcon fontSize={"large"} />
                </div>
            </div>
            <div className={"follow-modal"}>
                <div className={"follow-title-section"}>
                    <div className={"follow-title"}>
                        {props.isWing && "팔로잉"}
                        {!props.isWing && "팔로워"}
                    </div>
                </div>
                <div className={"follow-content-section"}>
                    {follows.map((foid) => (
                        <FollowCard userId={foid.userId} f_id={foid.f_id} handleCancel={ handleCancel } />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Follow;