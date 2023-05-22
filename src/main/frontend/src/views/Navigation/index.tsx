import React, {useState} from 'react';
import styled from 'styled-components';
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import Posting from "../Posting";
import "./style.css";

const Navigation = ({userid}: { userid : string | null}) => {
    const [open, setOpen] = useState(false);
    const movePage = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);

    };

    return (
        <div>
            <Wrapper>
                <Icon onClick={() => movePage('/')}><HomeIcon fontSize="large" className={"icon-image"}/></Icon>
                <Icon onClick={() => {movePage('/'+userid)}}><AccountCircleIcon fontSize="large" className={"icon-image"}/></Icon>
                <Icon onClick={() => handleClickOpen()}><AddBoxOutlinedIcon fontSize="large" className={"icon-image"}/></Icon>
            </Wrapper>
            {open && <Posting handleClose={handleClose} userid={userid}/>}
        </div>
    );
};

const Wrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  bottom: 0;
  left: 0;
  width: 63px;
  padding: 15px;
  background-color: #ffffff;
  border-right: 1px solid rgb(220, 220, 220);
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 48px;
  margin-bottom: 20px;
  font-size: 16px;
  background-color: transparent;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
  &:hover > .icon-image {
     font-size: 40px;
  }
`;

export default Navigation;