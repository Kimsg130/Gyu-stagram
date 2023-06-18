import React, {useEffect, useRef, useState} from 'react';
import "./style.css";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import DefaultImage from "../../assets/images/default.png";
import {deepOrange, deepPurple, grey, lightBlue, lightGreen} from "@mui/material/colors";


const FriendMap = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);
    const isDraggingRef = useRef<boolean>(false);
    const startPosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
    const scaleRef = useRef<number>(1);

    useEffect(() => {
        const container = containerRef.current;
        const parent = parentRef.current;
        if (!container || !parent) return;

        const handleMouseDown = (event: MouseEvent) => {
            isDraggingRef.current = true;
            startPosRef.current = { x: event.clientX, y: event.clientY };
        };

        const handleMouseMove = (event: MouseEvent) => {
            if (!isDraggingRef.current) return;

            const deltaX = event.clientX - startPosRef.current.x;
            const deltaY = event.clientY - startPosRef.current.y;

            container.scrollLeft -= deltaX / scaleRef.current;
            container.scrollTop -= deltaY / scaleRef.current;

            startPosRef.current = { x: event.clientX, y: event.clientY };
        };

        const handleMouseUp = () => {
            isDraggingRef.current = false;
        };

        // const handleWheel = (event: WheelEvent) => {
        //     event.preventDefault();
        //
        //     const delta = Math.sign(event.deltaY);
        //     const zoomStep = 0.1;
        //
        //     if (delta === 1) {
        //         scaleRef.current -= zoomStep;
        //         scaleRef.current = Math.max(scaleRef.current, 0.1);
        //     } else if (delta === -1) {
        //         scaleRef.current += zoomStep;
        //         scaleRef.current = Math.min(scaleRef.current, 3);
        //     }
        //
        //     container.style.transform = `scale(${scaleRef.current})`;
        // };

        parent.addEventListener('mousedown', handleMouseDown);
        parent.addEventListener('mousemove', handleMouseMove);
        parent.addEventListener('mouseup', handleMouseUp);
        // parent.addEventListener('wheel', handleWheel);

        return () => {
            parent.removeEventListener('mousedown', handleMouseDown);
            parent.removeEventListener('mousemove', handleMouseMove);
            parent.removeEventListener('mouseup', handleMouseUp);
            // parent.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
    <div className={"mapWrapper"} ref={parentRef}>
        <div className="map-title">친구 관계도</div>
        <div ref={containerRef} className={"stock-container"} >
            <div className={"map-component"} >
                <div className={"map-myProfile img-hoverable"}>
                    <Avatar
                        alt="자기자신"
                        // src={DefaultImage}
                        sx={{ width: 110, height: 110, bgcolor: deepOrange[500] }}
                    >나</Avatar>
                    {/*<div className={"map-id"}>id</div>*/}
                </div>
                <div className={"map-one img-hoverable"}>
                    <Avatar
                        alt="one"
                        // src={DefaultImage}
                        sx={{ width: 70, height: 70, bgcolor: deepPurple[500]}}
                    >P:1 D:1</Avatar>
                    {/*<div className={"map-id"}>id</div>*/}
                </div>
                <div className={"map-two img-hoverable"}>
                    <Avatar
                        alt="two"
                        // src={DefaultImage}
                        sx={{ width: 70, height: 70, bgcolor: lightBlue[500]}}
                    >P:2 D:1</Avatar>
                    {/*<div className={"map-id"}>id</div>*/}
                </div>
                <div className={"map-three img-hoverable"}>
                    <Avatar
                        alt="three"
                        // src={DefaultImage}
                        sx={{ width: 70, height: 70, bgcolor: lightGreen[500]}}
                    >P:3 D:1</Avatar>
                    {/*<div className={"map-id"}>id</div>*/}
                </div>
                <div className={"map-four img-hoverable"}>
                    <Avatar
                        alt="four"
                        // src={DefaultImage}
                        sx={{ width: 70, height: 70, bgcolor: grey[500]}}
                    >P:4 D:1</Avatar>
                    {/*<div className={"map-id"}>id</div>*/}
                </div>
            </div>
        </div>
    </div>
    );
};

export default FriendMap;