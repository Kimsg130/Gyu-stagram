import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';

import "./style.css";
import axios from "axios";
import PostCard from "./PostCard";
import Button from "../Button";
import SearchBar from "./SearchBar";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Logo from "../../assets/images/logo.png";
import {useNavigate} from "react-router-dom";


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
    const movePage = useNavigate();

    const [mainInfo, setMainInfo] = useState<MainInfo>({
        name: '',
        image: '',
        posts: [],
        follower: [],
        following: [],
    });

    const goToMap = (where: string) => {
        movePage(where);
    }

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
                <div className={"mainPage-profile-wrap"}>
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
                        <div className={"spacer"} />
                        <Button label={"전환"} clickFunction={ () => goToMap('/login') }/>
                    </div>
                    <div className={"friend-map-wrap"}>
                        <div className={"friend-map-discribe"}>친구 관계도 보기</div>
                        <Button label={"보 기"} primary={true} clickFunction={ () => goToMap('/friend-map') }/>
                    </div>
                </div>
                <div className={"mainPage-header"}>
                    <img src={Logo} alt={"logo failed"} style={{width: "114px", marginLeft: "-35px", marginRight: "96px"}}/>
                    <PersonSearchIcon fontSize={"large"} className={"hoverable"} sx={{padding: '4px', borderRadius: '50%'}}/>
                    <SearchBar />
                </div>
                <div className={"mainPage-cards"}>
                    {mainInfo.posts.map((post: Posts) => (
                        <PostCard post={post} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MainPage;