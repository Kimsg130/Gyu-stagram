import React, {SyntheticEvent, useEffect, useState} from 'react';

import './style.css';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Button from "../Button";
import Comment from "./Comment";

import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertCommentOutlinedIcon from '@mui/icons-material/InsertCommentOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import InputBase from '@mui/material/InputBase';
import {useRecoilValue} from "recoil";
import {tokenState} from "../../recoil/tokenState";

import defaultImage from "../../assets/images/default.png";

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

interface Likes {
    likeId : number;
    userId : string;
    sendingLikesId : number;
    kind : string;
    likeDate : Date;
}

const Modal = (props:Props) => {
    const { open, handleClose, post } = props;
    const [user_image, setUser_Image] = useState('');
    const [comments, setComments] = useState<Comment[]>([]);
    const [likes, setLikes] = useState<Likes[]>([]);
    const [sendComment, setSendingComment] = useState('');
    const [reComment, setReComment] = useState(false);
    const [disable, setDisable] = useState(true);
    const rogin_UserId : string | null = useRecoilValue(tokenState).userId;
    const movePage = useNavigate();


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

        axios.get('http://localhost:8082/get_likes', {
            params : {
                sendingLikesId: post.postId,
                kind: "post",
            }
        })
            .then(response => {
                console.log(response.data);
                setLikes(response.data);
            })
            .catch(error => console.log(error));

    }, []);

    useEffect(() => {
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

    }, [reComment]);

    useEffect(() => {
        if(sendComment.trim() === '') {
            setDisable(true);
        }else {
            setDisable(false);
        }
    }, [sendComment]);

    const sendingComment = (userId:string|null, postId:number, comment:string) => {
        axios
            .post('http://localhost:8082/commenting', {
                userId,
                postId,
                comment
            })
            .then((response) => {
                console.log(response.data);
                if(reComment === false) { setReComment(true); }
                else { setReComment(false); }
                setSendingComment('');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultImage;
    }

    return (
        <div className={"modal-container"}>
            <div className={"close-area"} onClick={() => handleClose()}>
                <div className={"close-modal hoverable"}>
                    <CloseIcon fontSize={"large"} />
                </div>
            </div>
            <div className={"modal"}>
                <img src={post.images} alt={"힝"} className={"modal-image"}
                     onError={handleImgError}/>
                <div className={"modal-content-section"}>
                    <div className={"modal-top-section modal-section"}>
                        <img className={"profile-image hoverable"} src={user_image} onError={handleImgError}/>
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
                            <img className="profile-image hoverable" src={user_image} onError={handleImgError}/>
                            <div>
                                <div>
                                    <span className="username hoverable" onClick={() => {
                                        movePage('/'+post.userId);
                                        handleClose();
                                    }}>{post?.userId}</span>
                                    <span>{post?.explains}</span>
                                    <div className="comment-details">
                                        {post?.postDate.toString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {comments.map((comment, index) => (
                            <Comment comment={comment} handleClose={handleClose} />
                        ))}
                    </div>
                    <div className="modal-details-section modal-section">
                        <div className="detail-actions">
                            <FavoriteBorderIcon className="hoverable" />
                            <InsertCommentOutlinedIcon className="hoverable" />
                            <div className="spacer" />
                            <ShareOutlinedIcon className="hoverable" />
                        </div>
                        <div className={"comment-details-likes"}>
                            {likes[0]?.userId}님 외의 {likes.length} 분(들)이 좋아합니다.</div>
                        <div className="comment-details">{post.postDate.toString()}</div>
                    </div>
                    <div className="modal-write-section modal-section">
                        <div className={"modal-write-input"}>
                            <InputBase
                                sx={{ ml: 1, flex: 1, width: 250 }}
                                value={sendComment}
                                placeholder="댓글 달기..."
                                inputProps={{ 'aria-label': 'write comment' }}
                                onChange={(e) => {
                                    setSendingComment(e.target.value);
                                }}
                            />
                        </div>
                        <div className="spacer" />
                        <div className={"modal-write-button"}>
                            <Button label={"게시"} disable={disable} clickFunction={() => sendingComment(rogin_UserId, post.postId, sendComment)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;