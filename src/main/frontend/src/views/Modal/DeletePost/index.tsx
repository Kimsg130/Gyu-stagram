import React from 'react';
import CloseIcon from "@mui/icons-material/Close";
import FollowCard from "../../MyPage/Follow/FollowCard";
import "./style.css";
import Button from "../../Button";
import axios from "axios";
import {useNavigate} from "react-router-dom";
interface Props {
    handleClose: () => void;
    postId : number;
}

const DeletePost = (props:Props) => {
    const movePage = useNavigate();
    const doDeletePost = (p_id: number) => {
        axios.delete('http://localhost:8082/deletepost', {
            params : {
                p_id: p_id
            }
        })
            .then(response => {
                movePage("/");
                console.log("SUCCESS");
            })
            .catch(error => console.log(error));
    }


    return (
            <div className={"delete-modal"}>
                <div className={"delete-title-section"}>
                    <div className={"delete-title"}>
                        게시글 삭제
                    </div>
                    <CloseIcon className={"hoverable"} fontSize={"large"} onClick={() => props.handleClose()} />
                </div>
                <div className={"delete-content-section"}>
                    <div style={{padding: "20px", fontWeight: "bold", marginTop: "-50px"}}>정말 삭제하시겠습니까?</div>
                    <Button label={"삭제"} primary={true} clickFunction={()=>{doDeletePost(props.postId)}} />
                </div>
            </div>
    );
};

export default DeletePost;