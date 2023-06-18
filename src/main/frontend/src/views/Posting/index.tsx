import React, {useEffect, useRef, useState} from 'react';
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import "./style.css";
import Button from "../Button";

import defaultImage from "../../assets/images/default.png";
import {TextField} from "@mui/material";
import axios from "axios";
import InputBase from "@mui/material/InputBase";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import {useNavigate} from "react-router-dom";

interface Props{
    handleClose: () => void;
    userid : string | null;
}

const Posting = ( props: Props ) => {
    //TODO: 줄바꿈 텍스트, 포스팅하면 리랜더링, 드래그앤드랍
    const inputFile : React.MutableRefObject<HTMLInputElement | null> = useRef<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [user_Image, setUser_Image] = useState('');
    const [describe, setDescribe] = useState('');
    const movePage = useNavigate();
    const openFileDialog = () => {
        inputFile.current!.click();
    };

    useEffect(() => {
        axios.get('http://localhost:8082/profile', {
            params : {
                userId: props.userid,
            }
        })
            .then(response => {
                const userInfo = response.data;
                setUser_Image(userInfo.image);
            })
            .catch(error => console.log(error));

    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: File = event.currentTarget.files![0];
        setSelectedFile(file);
        console.log(file);
    }

    const handleUpload = () => {
        if(selectedFile !== null) {
            const formData = new FormData();
            formData.append('image', selectedFile);

            axios.post('http://localhost:8082/api/upload/image', formData)
                .then((response) => {
                    // 이미지 업로드 성공 시 처리
                    console.log('이미지 업로드 성공:', response.data);
                    handlePosting(response.data);
                })
                .catch((error) => {
                    // 이미지 업로드 실패 시 처리
                    console.error('이미지 업로드 실패:', error);
                });
        }

    }

    const handlePosting = (imgPath: string) => {
        if(imgPath !== '') {
            axios.post('http://localhost:8082/posting', {
                "userId": props.userid,
                "explains": describe,
                "images": imgPath
            }).then((response) => {
                console.log('포스팅 성공: ', response.data);
                // movePage("/");

                props.handleClose();
            }).catch((error) => {
                console.error('포스팅 실패:', error);
            });
        }
    }

    return (
        <div className={"modal-container posting"}>
            <div className={"close-area"} onClick={() => props.handleClose()}>
                <div className={"close-modal hoverable"}>
                    <CloseIcon fontSize={"large"} />
                </div>
            </div>
            <div className={"posting-modal"}>
                <div className={"posting-title-section"}>
                    {selectedFile && (<ArrowBackIosRoundedIcon className={"goSelect hoverable"} onClick={()=>{
                    setSelectedFile(null)}
                    }/>) }
                    <div className={"posting-title"}>새로운 포스팅</div>
                    {selectedFile && (<div className={"goSelect"} />) }
                </div>
                {selectedFile === null ? (
                    <div className={"posting-content-section first"}>
                        <AddPhotoAlternateOutlinedIcon className={"posting-content-image"}/>
                        <div className={"posting-content-describe"} >
                            사진을 여기에 끌어다 놓아 보세요!(개발 예정)
                        </div>
                        <div>  {/* onClick={() => props.handleClose() } */}
                             <Button label={"컴퓨터에서 선택"} primary={true} clickFunction={openFileDialog}/>
                        </div>
                        <input type='file' id='file' ref={inputFile} style={{display: 'none'}} onChange={handleChange}/>
                    </div>
                ) : (
                    <div className={"posting-content-section second"}>
                        <img className={"posting-content-preview"} src={URL.createObjectURL(selectedFile)} alt={"힝"} />
                        <div className={"posting-content-edit"}>
                            <div className={"posting-content-profile"}>
                                <img className={"content-profile-image hoverable"} src={user_Image} alt={"힝"}/>
                                <div className={"username hoverable"}>{props.userid}</div>
                            </div>
                            <TextField
                                className={"posting-content-textArea"}
                                id="standard-multiline-static"
                                multiline
                                rows={8}
                                value={describe}
                                inputProps={{maxLength: 255}}
                                placeholder={"문구 입력..."}
                                sx={{
                                    '.MuiInputBase-input': { fontSize: '16px' },
                                }}
                                variant="standard"
                                onChange={(e) => {setDescribe(e.target.value)}}
                            />
                            <div className={"textArea-limit"} >
                                <InputBase
                                    className={"textArea-limit-style"}
                                    inputProps={{style:{textAlign: 'right'}}}
                                    value={describe.length+"/255"}
                                    disabled
                                />
                            </div>
                            <div className={"posting-content-button"}>
                                <Button label={"게시"} clickFunction={handleUpload}/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Posting;