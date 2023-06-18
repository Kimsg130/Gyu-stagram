import React, {useEffect, useState} from 'react';
import Avatar from "@mui/material/Avatar";
import Button from "../../../Button";
import "./style.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface Follows {
    userId : string;
    f_id : number;
    handleCancel: () => void;
}

const FollowCard = (props: Follows) => {

    const [image, setImage] = useState('');
    const movePage = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: props.userId
            }
        })
            .then(response => {
                const userInfo = response.data;
                console.log(userInfo);
                setImage(userInfo.image);
            })
            .catch(error => console.log(error))

    }, []);

    const cancelFollow = (f_id: number) => {
        axios.delete('http://localhost:8082/deletefollow', {
            params : {
                f_id: f_id
            }
        })
            .then(response => {
                console.log("SUCCESS");
            })
            .catch(error => console.log(error));
    };

    return (
        <div className={"fow"}>
            <Avatar style={{marginRight: "15px"}} alt="Remy Sharp" src={image} />
            <div className={"hoverable"} onClick={() => { movePage("/"+props.userId) }} >{props.userId}</div>
            <div className={"spacer"}></div>
            <Button label={"취소"} primary={true} clickFunction={() => {
                props.handleCancel();
                cancelFollow(props.f_id);
            } }/>
        </div>
    );
};

export default FollowCard;