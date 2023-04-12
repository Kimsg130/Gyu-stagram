import React from 'react';
import SignUp from "./SignUp";
import {Button, Container, Link} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogIn from "./LogIn";

function Authentication() {

    const movePage = useNavigate();

    function goSignup() {
        movePage("/signup");
    }

    function goLogin() {
        movePage("/login");
    }

    return (
        <Container>
            <p>홈</p>
            <Button fullWidth onClick={() => goSignup()} variant="contained"> 회원가입 </Button>
            <Button fullWidth onClick={() => goLogin()} variant="contained"> 로그인 </Button>
        </Container>
    );
}

export default Authentication;
