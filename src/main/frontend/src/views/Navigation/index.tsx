import React from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MyPage from "../MyPage";


const Navigation = () => {
    const movePage = useNavigate();

    return (
        <Wrapper>
            <Icon onClick={() => movePage('/')}><HomeIcon fontSize="large" /></Icon>
            <Icon onClick={() => movePage('/profile')}><AccountCircleIcon fontSize="large" /></Icon>
        </Wrapper>
    );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  padding: 20px;
  background-color: #f5f5f5;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 20px;
  font-size: 16px;
  color: #999999;
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    color: #000000;
  }
`;

export default Navigation;