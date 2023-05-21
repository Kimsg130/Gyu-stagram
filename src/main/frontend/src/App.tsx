import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import SignUp from "./views/Authentication/SignUp";
import LogIn from "./views/Authentication/LogIn";
import MyPage from "./views/MyPage";
import {useRecoilValue} from "recoil";
import {tokenState} from "./recoil/tokenState";
import Navigation from "./views/Navigation";


function App() {

    //recoil에서 로그인된 아이디를 받아옴
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
                    <Route path={"/:userId"} element={userId ? <MyPage /> : <Navigate to={"/login"} /> }></Route>
                </Routes>
                { userId ? (<Navigation userid={userId} />) : null }
                <img src={"https://storage.googleapis.com/download/storage/v1/b/gyu-stagram-project.appspot.com/o/ee28c422-3fc7-4bf7-9bc2-066d278a4e0f_%EB%81%BC%EB%A6%AC%EC%BD%94%20%EC%8B%A0%EC%9D%B4%EB%8B%882.png?generation=1684701697096713&alt=media"} />
            </BrowserRouter>
        </div>
    );
}

export default App;
