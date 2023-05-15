import React, {useEffect, useState} from "react";

import "./style.css";
import axios from "axios";

interface Comment {
    commentId : number;
    userId : string;
    postId : number;
    comment : string;
    commentDate : Date;
}

interface Props {
    comment: Comment;
}

export default function Comment({ comment }: Props) {
    const [user_image, setUser_Image] = useState('');

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
                    <span className="username hoverable">{comment.userId}</span>
                    <span>{comment.comment}</span>
                </div>
                <div className="comment-details">
                    {comment.commentDate.toString()}
                </div>
            </div>
        </div>
    );
}