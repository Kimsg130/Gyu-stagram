import React, {useState} from 'react';
import {Box, Button, Container, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";
import {useRecoilState} from "recoil";
import {tokenState} from "../../../recoil/tokenState";

function Index() {
    //로그인페이지 구현
    const [userId, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    //recoil을 통해 어세스토큰과 유저아이디를 localstorage에 저장
    const [accessToken, setTokenState] = useRecoilState(tokenState);

    const signInHandler = () : void => {
        if(userId.length === 0 || password.length === 0) {
            alert('아이디와 비밀번호를 입력하세요.');
            return;
        }

        const data = {
            userId,
            password
        };

        axios.post("http://localhost:8082/api/auth/login", data)
            .then((response) : void => {
                console.log(response.data);
                setTokenState({ // DONE : recoil, 로컬스토리지에서 아이디와 어세스토큰 관리
                    accessToken : response.data.accessToken, // TODO : 새로고침하면 날라가기 때문에 다시 발급 받는다던지 하는걸 찾자 아님 쿠키
                    userId : userId,
                })
                document.cookie = `refresh_token=${response.data.refreshToken}`; // DONE : 리프레시토큰은 쿠키에 저장
            }).catch((error) => {
                console.log(error);
                alert('로그인에 실패.');
        });
    }

    return (
        <Card sx={{ minWidth : 275, maxWidth : "50vw" }}>
            <CardContent>
                <Box>
                    <TextField
                        fullWidth
                        label="아이디"
                        type="text"
                        variant="standard"
                        onChange={(e) => setId(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="비밀번호"
                        type="password"
                        variant="standard"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth onClick={() => signInHandler()} variant="contained"> 로그인 </Button>
            </CardActions>
        </Card>
    );
}

export default Index;