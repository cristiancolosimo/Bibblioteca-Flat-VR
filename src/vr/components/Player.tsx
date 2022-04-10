import { OrbitControls } from "@react-three/drei";
import { useStore } from "@react-three/fiber";
import { Hands, DefaultXRControllers, useXR, useController, useXREvent, useXRFrame } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { socket_connection } from "../../api/communication";

import {useState as useHookState} from '@hookstate/core'
import { GlobalUserdata } from "../../api/globals";
import * as THREE from "three";
import { decostructVector } from "../utils/vector";

let clock:any = new THREE.Clock();//

 function playerPositionMove(_axis: number, _index:number, _playerOBJ:any, _speed:number, _clock:THREE.Clock) {
    if(_axis < 0.5 || _axis > -0.5){
        switch(_index){
            case 3: _playerOBJ.position.x +=_axis*_speed*_clock.getDelta(); break;
            case 2: _playerOBJ.position.z +=_axis*_speed*_clock.getDelta(); break;
            default: break;
        }
    }
 }

export default function Player() {
    const speed = 100;

    const Userdata = useHookState(GlobalUserdata);
    const { controllers, player, isPresenting,isHandTracking } = useXR()
    const rightController = useController('right');
    const leftController = useController('left');

    const playerRef = useRef();
    const [playerData, setPlayerData] = useState<any>(null);
    
    
    useEffect(() => {
        socket_connection.on("login", data => {
            setPlayerData(data);
            Userdata.set(p=> data.id);
            console.log(data);
            console.log("connessione fatta")
        });
        player.scale.set(1.5,1.5,1.5) 
        
    }, [])

    

     
    useXRFrame((time, xrFrame) => {
        rightController?.inputSource.gamepad.axes.forEach((axis, index) => playerPositionMove(axis, index, player, speed,clock));

        // do something on each frame of an active XR session
        if (leftController && rightController && playerData !== null) {

            const dataToSend = {
                //id: playerData.id,
                ...playerData,
                head: {
                    type: "headset",
                    position: decostructVector(player.position),
                    rotation: decostructVector(player.rotation)
                },
                leftController: {
                    type: "controller",
                    position: decostructVector(leftController.controller.position),
                    rotation: decostructVector(leftController.controller.rotation)
                },
                rightController: {
                    type: "controller",
                    position: decostructVector(rightController.controller.position),
                    rotation: decostructVector(rightController.controller.rotation)
                }
            };

            //console.log(dataToSend)
            // console.log(playerData) //rotation //scale
            socket_connection.emit("location_player", dataToSend)

            setPlayerData(dataToSend)
        } else {
            //console.log("errore")
            //console.log(playerData)
        }
        if (playerData == null) socket_connection.emit("request_login", "dammi i dati");
    });
    return (
        <>
        <group ref={playerRef}>
            <OrbitControls></OrbitControls>
            {/*<Hands />*/} 
            
            <DefaultXRControllers />
        </group>
        </>
    )
}