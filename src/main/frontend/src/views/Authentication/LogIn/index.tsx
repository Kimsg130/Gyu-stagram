import React, {useState} from 'react';
import {Box, Button, Container, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import axios from "axios";

function Index() {
    //TODO : 로그인페이지 구현
    const [userId, setId] = useState<string>('');
    const [password, setPassword] = useState<string>('');

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
            .then((response) => {
                console.log(response.data);
                document.cookie = `access_token=${response.data.accessToken}`;
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