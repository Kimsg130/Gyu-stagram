import React, {useEffect, useState} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import {IconButton, Link} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';


interface ModalProps {
    open: boolean;
    handleClose: () => void;
    post: Posts;
}

interface Posts {
    postId : number,
    explains : string,
    images : string,
    postdate : string,
    userId : string,
}

const PostPage = (props: ModalProps) => {
    const { open, handleClose, post } = props;
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                Post Detail
                <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <ModalContent>
                    {isImageLoaded ? null : <p>Loading...</p>}
                    <ModalImage
                        src={post.images}
                        onLoad={() => setIsImageLoaded(true)}
                        style={isImageLoaded ? {} : { display: 'none' }}
                    />
                    <p>{post.explains}</p>
                </ModalContent>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose}>Close</button>
            </DialogActions>
        </Dialog>
    );
}

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  padding: 20px;
`;

const ModalImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
`;

export default PostPage;


// const [postInfo, setPostInfo] = useState<Posts>({
//     postId : 0,
//     explains : '',
//     images : '',
//     postdate : '',
//     userId : '',
// });

// useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
//     axios.get('http://localhost:8082/post', {
//         params : {
//             postId : post_id,
//         }
//     })
//         .then(response => {
//             setPostInfo(response.data as Posts);
//         })
//         .catch(error => console.log(error))
//
// }, [post_id]);