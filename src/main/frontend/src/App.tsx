import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios';
import Authentication from "./views/Authentication";
import {Button, Container} from "@mui/material";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SignUp from "./views/Authentication/SignUp";
import LogIn from "./views/Authentication/LogIn";
import MyPage from "./views/MyPage";
import Navigation from "./views/Navigation";
import {RecoilRoot, useRecoilValue} from "recoil";
import {tokenState} from "./recoil/tokenState";


function App() {
    // const [hello, setHello] = useState('')

    // useEffect(() => { //특정한 state가 바뀌면 실행됨, deps를 비워두면 맨처음 한번만 실행됨
    //     axios.get('/api/hello')
    //         .then(response => setHello(response.data))
    //         .catch(error => console.log(error))
    // }, []);
    const userId : string | null = useRecoilValue(tokenState).userId;

    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        userId ? (
                            <MyPage />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    } />
                    <Route path={"/signup"} element={userId ? <Navigate to={"/"} /> : <SignUp />}></Route>
                    <Route path={"/login"} element={userId ? <Navigate to={"/"} /> : <LogIn />}></Route>
                    <Route path={"/profile"} element={userId ? <MyPage /> : <Navigate to={"/login"} /> }></Route>
                </Routes>
                {/*<Authentication />*/}


            </BrowserRouter>
        </div>
    );
}

export default App;
