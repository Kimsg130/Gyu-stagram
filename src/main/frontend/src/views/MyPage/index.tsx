import React, {SyntheticEvent, useEffect, useState} from 'react';
import styled from 'styled-components';
import {ImageList, ImageListItem} from "@mui/material";
import GridOnIcon from '@mui/icons-material/GridOn';
import {useRecoilValue} from "recoil";
import {tokenState} from "../../recoil/tokenState";
import axios from "axios";
import './style.css';
import Navigation from "../Navigation";
import Modal from "../Modal";
import {useNavigate, useParams} from "react-router-dom";
import defaultImage from "../../assets/images/default.png";
import Follow from "./Follow";
import Button from "../Button";


// type PostImageProps = {
//     src: string;
// };

interface Posts {
    postId : number;
    explains : string;
    images : string;
    postDate : Date;
    userId : string;
}

const MyPage = ({key}: {key?: number}) => {

    //TODO: 팔로워 팔로잉 보기
    const { userId } = useParams();
    const rogin_UserId : string | null = useRecoilValue(tokenState).userId;

    const finalUserId = userId || rogin_UserId;

    const [alreadyFollow, setAlreadyFollow] = useState(false);
    const [user_comment, setUser_comment ] = useState('');
    const [user_image, setUser_image ] = useState('');
    const [user_name, setUser_name ] = useState('');
    const [posts, setPosts] = useState<Posts[]>([]);
    const [user_follower, setUser_follower ] = useState<string[]>([]);
    const [user_following, setUser_following ] = useState<string[]>([]);
    const [change, setChange] = useState(false);
    const [open, setOpen] = useState(false); // 포스트 모달 띄우기
    const [f_Open, setF_Open] = useState(false); // 팔로잉 창 띄우기
    const [isWing, setIsWing] = useState(true); // wing인지 wer인지
    const [selectedPost, setSelectedPost] = useState<Posts>({
        postId : 0,
        explains : '',
        images : '',
        postDate : new Date(),
        userId : '',
    });

    const handleClickOpen = (post : Posts) => {
        setOpen(true);
        setSelectedPost(post);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = defaultImage;
        e.currentTarget.srcset = defaultImage;
    }

    const user = {
        u_id: finalUserId,
        name: user_name,
        description: user_comment,
        profileImageUrl: user_image,
        postingCount : posts.length,
        followerCount: user_follower.length,
        followingCount: user_following.length,
    };


    useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: finalUserId
            }
        })
            .then(response => {
                const userInfo = response.data;
                console.log(userInfo);
                setUser_comment(userInfo.comment);
                setUser_image(userInfo.image);
                setUser_name(userInfo.name);
                setPosts(userInfo.posts);
                setUser_follower(userInfo.follower);
                setUser_following(userInfo.following);

            })
            .catch(error => console.log(error))
        setAlreadyFollow(false);
        if(rogin_UserId != null && user_following.includes(rogin_UserId) || rogin_UserId === finalUserId) {
            console.log("dkd")
            setAlreadyFollow(true);
        }
        console.log(alreadyFollow);


    }, [finalUserId, change]);


    const doFollow = (follower:string, following:string) => {
        axios
            .post('http://localhost:8082/dofollow', {
                follower,
                following
            })
            .then((response) => {
                setChange(!change);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className={"profile-page"}>
            <Container>
                <ProfileWrapper className={"profileWrapper"} >
                    <ProfileImage src={user.profileImageUrl} />
                    <ProfileInfo>
                        <div style={{display: "flex", flexDirection: "row", alignItems: "baseline"}}>
                            <ProfileName>{user.u_id}</ProfileName>
                            {!alreadyFollow && rogin_UserId && finalUserId && <Button label={"팔로우"} clickFunction={()=> { doFollow(rogin_UserId, finalUserId); } }/>}
                        </div>
                        <FollowInfo>
                            <FollowLabel>게시글</FollowLabel>
                            <FollowCount>{user.postingCount}&nbsp;&nbsp;</FollowCount>
                            <div onClick={() => { setF_Open(true); setIsWing(false); } }>
                                <FollowLabel className={"hoverable"}>팔로워</FollowLabel>
                                <FollowCount className={"hoverable"}>{user.followerCount}&nbsp;&nbsp;</FollowCount>
                            </div>
                            <div onClick={() => { setF_Open(true); setIsWing(true); } }>
                                <FollowLabel className={"hoverable"}>팔로잉</FollowLabel>
                                <FollowCount className={"hoverable"}>{user.followingCount}</FollowCount>
                            </div>
                        </FollowInfo>
                        <div className={"profile-name"}>{user.name}</div>
                        <ProfileDescription>{user.description}</ProfileDescription>
                    </ProfileInfo>
                </ProfileWrapper>
                <div className={"post-label hoverable"}><GridOnIcon /><div>포스트</div></div>
                <ImageList cols={3} className={"grid"} >
                    {posts.map((post) => (
                        <ImageListItem key={post.postId} sx={{ height: '100%'}}  className={"post"} onClick={() => handleClickOpen(post)}>
                            <img
                                className={"thumbnails"}
                                src={post.images}
                                srcSet={post.images}
                                alt={"ggg"}
                                loading="lazy"
                                onError={handleImgError}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Container>
            {open && <Modal open={open} handleClose={handleClose} post={selectedPost}/>}
            {f_Open && <Follow userid={finalUserId} isWing={ isWing } handleClose={() => { setF_Open(false); } } />}
        </div>
    );
};

type ContainerProps = {
    children: React.ReactNode;
};

const Container = ({ children }: ContainerProps) => {
    return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 600px;
`;

const ProfileWrapper = styled.div`
  display: flex;
  //align-items: center;
  margin-top: 40px;
`;

const ProfileImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 5px solid transparent;
  background-image: linear-gradient(#ff0000, #d2bb00), linear-gradient(to right, rgb(255, 228, 12), rgba(227, 42, 42, 0.67), #65d3ffaa);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin-right: 70px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  //justify-content: center;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

const ProfileDescription = styled.p`
  font-size: 16px;
  color: gray;
  margin-bottom: 60px;
`;

const FollowInfo = styled.div`
  display: flex;
  align-items: center;
`;

const FollowCount = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const FollowLabel = styled.span`
  font-size: 16px;
  color: gray;
`;

export default MyPage;


//{postImageUrls.map((post) => (
//                         <ImageListItem key={post} className={"post"}>
//                             <img
//                                 src={`${post}?w=164&h=164&fit=crop&auto=format`}
//                                 srcSet={`${post}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
//                                 alt={post}
//                                 loading="lazy"
//                             />
//                         </ImageListItem>
//                     ))}
// const postImageUrls : string[] = [
//     'https://picsum.photos/id/234/200/200',
//     'https://picsum.photos/id/235/200/200',
//     'https://picsum.photos/id/236/200/200',
//     'https://picsum.photos/id/237/200/200',
//     'https://picsum.photos/id/238/200/200',
//     'https://picsum.photos/id/239/200/200',
//     'https://picsum.photos/id/240/200/200',
//     'https://picsum.photos/id/241/200/200',
//     'https://picsum.photos/id/242/200/200',
//     'https://picsum.photos/id/242/200/200',
//     'https://picsum.photos/id/242/200/200',
// ];