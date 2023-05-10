import React from 'react';
import styled from 'styled-components';
import {ImageList, ImageListItem} from "@mui/material";

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

const PostImage = styled.img`
  width: 100%;
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

type PostImageProps = {
    src: string;
};

const MyPage = () => {
    const user = {
        name: '사용자 이름',
        description: '사용자 설명',
        profileImageUrl: 'https://picsum.photos/id/237/200/300',
        followerCount: 500,
        followingCount: 500,
    };


    const postImageUrls = [
        'https://picsum.photos/id/234/200/200',
        'https://picsum.photos/id/235/200/200',
        'https://picsum.photos/id/236/200/200',
        'https://picsum.photos/id/237/200/200',
        'https://picsum.photos/id/238/200/200',
        'https://picsum.photos/id/239/200/200',
        'https://picsum.photos/id/240/200/200',
        'https://picsum.photos/id/241/200/200',
        'https://picsum.photos/id/242/200/200',
    ];

    return (
        <Container>
            <ProfileWrapper>
                <ProfileImage src={user.profileImageUrl} />
                <ProfileInfo>
                    <ProfileName>{user.name}</ProfileName>
                    <ProfileDescription>{user.description}</ProfileDescription>
                    <FollowInfo>
                        <FollowCount>{user.followerCount}</FollowCount>
                        <FollowLabel>followers&nbsp;&nbsp;</FollowLabel>
                        <FollowCount>{user.followingCount}</FollowCount>
                        <FollowLabel>following</FollowLabel>
                    </FollowInfo>
                </ProfileInfo>
            </ProfileWrapper>
            <br />
            <hr />
            <PostGrid>
                <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {postImageUrls.map((url) => (
                        <ImageListItem key={url}>
                            <img
                                src={`${url}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={url}
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

export default MyPage;