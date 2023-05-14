import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ImageList, ImageListItem} from "@mui/material";
import {useRecoilValue} from "recoil";
import {tokenState} from "../../recoil/tokenState";
import axios from "axios";

type PostImageProps = {
    src: string;
};

const MyPage = () => {

    const userId : string | null = useRecoilValue(tokenState).userId;
    const [user_comment, setUser_comment ] = useState('');
    const [user_image, setUser_image ] = useState('');
    const [user_name, setUser_name ] = useState('');
    const [posts, setPosts] = useState<Posts[]>([]);
    const [user_follower, setUser_follower ] = useState(0);
    const [user_following, setUser_following ] = useState(0);

    interface Posts {
        post_id : number,
        explains : string,
        images : string,
        post_date : string,
        user_id : string,
    }

    const user = {
        u_id: userId,
        name: user_name,
        description: user_comment,
        profileImageUrl: user_image,
        postingCount : posts.length,
        followerCount: user_follower,
        followingCount: user_following,
    };

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
    // ];

    useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: userId
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

    }, []);


    return (
        <Container>
            <ProfileWrapper>
                <ProfileImage src={user.profileImageUrl} />
                <ProfileInfo>
                    <ProfileName>{user.u_id}</ProfileName>
                    <ProfileDescription>{user.name}<br/>{user.description}</ProfileDescription>
                    <FollowInfo>
                        <FollowLabel>게시글</FollowLabel>
                        <FollowCount>{user.postingCount}&nbsp;&nbsp;</FollowCount>
                        <FollowLabel>팔로워</FollowLabel>
                        <FollowCount>{user.followerCount}&nbsp;&nbsp;</FollowCount>
                        <FollowLabel>팔로잉</FollowLabel>
                        <FollowCount>{user.followingCount}</FollowCount>
                    </FollowInfo>
                </ProfileInfo>
            </ProfileWrapper>
            <br />
            <hr />
            <PostGrid>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {posts.map((post) => (
                        <ImageListItem key={post.post_id}>
                            <img
                                src={`${post.images}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${post.images}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={post.images}
                                loading="lazy"
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
                <UploadButton>
                    <UploadIcon />
                    <UploadText>Upload</UploadText>
                </UploadButton>
            </PostGrid>
        </Container>
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
  align-items: center;
  margin-top: 40px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProfileName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ProfileDescription = styled.p`
  font-size: 16px;
  color: gray;
  margin-bottom: 20px;
`;

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 40px;
`;

const UploadButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 200px;
  border: 1px dashed gray;
  border-radius: 5px;
`;

const UploadIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: lightgray;
  border-radius: 50%;
  margin-right: 10px;
`;

const UploadText = styled.div`
  font-size: 16px;
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