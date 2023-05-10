import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Authentication from "./views/Authentication";
import {Button, Container} from "@mui/material";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUp from "./views/Authentication/SignUp";
import LogIn from "./views/Authentication/LogIn";
import MyPage from "./views/MyPage";
import Navigation from "./views/Navigation";


function App() {
    // const [hello, setHello] = useState('')

    // useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
    //     axios.get('/api/hello')
    //         .then(response => setHello(response.data))
    //         .catch(error => console.log(error))
    // }, []);


    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/home"} element={<Authentication />}></Route>
                    <Route path={"/signup"} element={<SignUp />}></Route>
                    <Route path={"/login"} element={<LogIn />}></Route>
                    <Route path={"/mypage"} element={<MyPage />}></Route>
                </Routes>
                {/*<Authentication />*/}
                <Navigation />
                <MyPage />
            </BrowserRouter>

        </div>
    );
}

export default App;
