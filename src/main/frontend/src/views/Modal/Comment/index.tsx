import React, {useEffect, useState} from "react";

import "./style.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface Comment {
    commentId : number;
    userId : string;
    postId : number;
    comment : string;
    commentDate : Date;
}

interface Props {
    comment: Comment;
    handleClose: () => void;

}

export default function Comment({ comment, handleClose }: Props) {
    const [user_image, setUser_Image] = useState('');
    const movePage = useNavigate();



    useEffect( () => {
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: comment.userId,
            }
        })
            .then(response => {
                setUser_Image(response.data.image);
            })
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="comment-container">
            <img className="profile-image hoverable" src={user_image} />
            <div>
                <div>
                    <span className="username hoverable" onClick={() => {
                        movePage('/'+comment.userId);
                        handleClose();
                    }}>{comment.userId}</span>
                    <span>{comment.comment}</span>
                </div>
                <div className="comment-details">
                    {comment.commentDate.toString()}
                </div>
            </div>
        </div>
    );
}