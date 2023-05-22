import React, {SyntheticEvent, useEffect, useState} from 'react';
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import {red} from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "@mui/material/Card";
import defaultImage from "../../../assets/images/default.png";
import axios from "axios";
import Modal from "../../Modal";

interface Posts {
    postId : number;
    explains : string;
    images : string;
    postDate : Date;
    userId : string;
}

const PostCard = ({post}: {post: Posts}) => {

    const [expanded, setExpanded] = React.useState(false);
    const [user_Image, setUser_Image] = useState('');


    useEffect( () => {
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: post.userId,
            }
        })
            .then(response => {
                setUser_Image(response.data.image);
            })
            .catch(error => console.log(error));
    }, []);

    const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultImage;
        e.currentTarget.srcset = defaultImage;
    }


    return (
        <div>
            <Card sx={{ maxWidth: 345, margin: 2}}>
                <CardHeader
                    avatar={
                        <Avatar alt="실패" src={user_Image} className={"hoverable"} />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <div className={"hoverable"} style={{fontSize: 16}}>{post.userId}</div>
                    }
                    subheader={post.postDate.toString()}
                />
                <CardMedia
                    component="img"
                    height="350"
                    image={post.images}
                    alt="불러들이기 실패"
                    onError={handleImgError}
                />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {post.explains}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <div className={"spacer"} />
                    <ExpandMoreIcon className={"hoverable"} onClick={() => {
                        // setOpen(true); TODO
                    }}/>
                </CardActions>
            </Card>


        </div>
    );
};

export default PostCard;