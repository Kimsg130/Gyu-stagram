import React, {useState} from 'react';
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {Box, Button, TextField} from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

export default function SignUp() {
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordCheck, setPasswordCheck] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [nickname, setNickName] = useState<string>('');
    const signUpHandler = () => {
        const data = {
            email,
            phone,
            password,
            passwordCheck,
            name,
            nickname
        };
        axios
            .post('http://localhost:8082/api/auth/signUp', data)
            .then((response) => {

            })
            .catch((error) => {

            });
    };
    // TODO : 좀더 친절하게 UI 완성하기
    return (
        <Card sx={{ minWidth : 275, maxWidth : "50vw" }}>
            <CardContent>
                <Box>
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        type="email"
                        label="E-mail"
                        margin="dense"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Phone Number"
                        margin="dense"
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Password *"
                        type="password"
                        autoComplete="current-password"
                        margin="dense"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        id="outlined-password-input"
                        label="Password Check *"
                        type="password"
                        autoComplete="current-password"
                        margin="dense"
                        onChange={(e) => setPasswordCheck(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Name"
                        defaultValue=""
                        margin="dense"
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="Nick Name"
                        defaultValue=""
                        margin="dense"
                        onChange={(e) => setNickName(e.target.value)}
                    />
                </Box>
            </CardContent>
            <CardActions>
                <Button fullWidth onClick={() => signUpHandler()} variant="contained"> 회원가입 </Button>
            </CardActions>
        </Card>

    );
};