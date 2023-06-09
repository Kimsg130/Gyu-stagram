import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./views/Authentication/SignUp";
import LogIn from "./views/Authentication/LogIn";
import MyPage from "./views/MyPage";
import {useRecoilValue} from "recoil";
import {tokenState} from "./recoil/tokenState";
import Navigation from "./views/Navigation";
import MainPage from "./views/MainPage";
import FriendMap from "./views/FriendMap";


function App() {

    //recoil에서 로그인된 아이디를 받아옴
    const userId : string | null = useRecoilValue(tokenState).userId;



    return (
        <div className={"App"}>
            <BrowserRouter>
                <Routes>
                    <Route path={"/"} element={
                        userId ? (
                            <MainPage userid={userId} />
                        ) : (
                            <Navigate to={"/login"} />
                        )
                    } />
                    <Route path={"/signup"} element={userId ? <Navigate to={"/"} /> : <SignUp />}></Route>
                    <Route path={"/login"} element={userId ? <Navigate to={"/"} /> : <LogIn />}></Route>
                    <Route path={"/:userId"} element={userId ? <MyPage key={1} /> : <Navigate to={"/login"} /> }></Route>
                    <Route path={"/friend-map"} element={userId ? <FriendMap /> : <Navigate to={"/login"} />}></Route>
                </Routes>
                { userId ? (<Navigation userid={userId} />) : null }
            </BrowserRouter>
        </div>
    );
}

export default App;
