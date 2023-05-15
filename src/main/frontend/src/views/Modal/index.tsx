import React, {useEffect, useState} from 'react';
import './style.css';
import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import axios from "axios";
import Button from "../Button";
import {useNavigate} from "react-router-dom";
import Comment from "./Comment";

interface Props {
    open: boolean;
    handleClose: () => void;
    post: Posts;
}
interface Posts {
    postId : number;
    explains : string;
    images : string;
    postDate : Date;
    userId : string;
}

interface Comment {
    commentId : number;
    userId : string;
    postId : number;
    comment : string;
    commentDate : Date;
}

const Modal = (props:Props) => {
    const { open, handleClose, post } = props;
    const [user_image, setUser_Image] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const movePage = useNavigate();

    console.log(post);

    useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: post.userId,
            }
        })
            .then(response => {
                const userInfo = response.data;
                console.log(userInfo);
                setUser_Image(userInfo.image);
            })
            .catch(error => console.log(error));

        axios.get('http://localhost:8082/get_comments', {
            params : {
                postId: post.postId,
            }
        })
            .then(response => {
                console.log(response.data);
                setComments(response.data);
            })
            .catch(error => console.log(error));

    }, []);

    return (
        <div className={"modal-container"}>
            <div onClick={() => handleClose()} className={"close-modal hoverable"}>
                <CloseIcon fontSize={"large"} />
            </div>
            <div className={"modal"}>
                <img src={post.images} className={"modal-image"} />
                <div className={"modal-content-section"}>
                    <div className={"modal-top-section modal-section"}>
                        <img className={"profile-image hoverable"} src={user_image}/>
                        <div className={"username hoverable"} onClick={() => {
                            movePage('/'+post.userId);
                            handleClose();
                        }}>{post.userId}</div>
                        <Button label={"Follow"} />
                        <div className={"spacer"}></div>
                        <MoreHorizIcon className={"hoverable"} />
                    </div>
                    <div className="modal-comment-section modal-section">
                        <div className="comment-container">
                            <img className="profile-image hoverable" src={user_image} />
                            <div>
                                <div>
                                    <span className="username hoverable">{post?.userId}</span>
                                    <span>{post?.explains}</span>
                                    <div className="comment-details">
                                        {post?.postDate.toString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {comments.map((comment, index) => (
                            <Comment comment={comment} />
                        ))}
                    </div>
                    <div>Details section</div>
                    <div>Write section</div>
                </div>
            </div>
        </div>
    );
}

export default Modal;