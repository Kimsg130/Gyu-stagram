import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';

import "./style.css";
import axios from "axios";
import PostCard from "./PostCard";
import Modal from "../Modal";

interface MainInfo {
    name: string;
    image: string;
    posts : Posts[];
    follower: string[];
    following: string[];
}
interface Posts {
    postId : number;
    explains : string;
    images : string;
    postDate : Date;
    userId : string;
}

const MainPage = ( {userid}: { userid : string | null} ) => {
    const [mainInfo, setMainInfo] = useState<MainInfo>({
        name: '',
        image: '',
        posts: [],
        follower: [],
        following: [],
    });


    useEffect(() => {
        axios.get('http://localhost:8082/mainPage', {
            params : {
                userId: userid
            }
        })
            .then(response => {
                const info = response.data;
                setMainInfo(info);
                console.log(info);

            })
            .catch(error => console.log(error))
    }, []);



    return (
        <div>
            <div className={"mainPage-wrap"}>
                <div className={"mainPage-profile"}>
                    <Avatar
                        alt={`${userid}님의 프로필사진`}
                        src={mainInfo.image}
                        sx={{ width: 56, height: 56 }}
                    />
                    <div className={"id"}>
                        <div className={"mainPage-profile-id"}>{userid}</div>
                        <div className={"mainPage-profile-name"}>{mainInfo.name}</div>
                    </div>
                    <div>전환</div>
                </div>
                <div className={"mainPage-cards"}>
                    {mainInfo.posts.map((post: Posts) => (
                        <PostCard post={post} />
                    ))}
                </div>
            </div>
            <div>
                {/*{open && <Modal open={open} handleClose={handleClose} post={post} />} TODO*/}
            </div>
        </div>
    );
};

export default MainPage;