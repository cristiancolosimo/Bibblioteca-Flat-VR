import { OrbitControls } from "@react-three/drei";
import { useStore } from "@react-three/fiber";
import { Hands, DefaultXRControllers, useXR, useController, useXREvent, useXRFrame } from "@react-three/xr";
import { useEffect, useRef, useState } from "react";
import { socket_connection } from "../../api/communication";

import {useState as useHookState} from '@hookstate/core'
import { GlobalUserdata } from "../../api/globals";
import Box from "./Box";
import * as THREE from "three";

let clock:any = new THREE.Clock();//

export default function Player() {
    const speed = 100;

    const Userdata = useHookState(GlobalUserdata);
    const { controllers, player, isPresenting,isHandTracking } = useXR()
    const rightController = useController('right');
    const leftController = useController('left');
    //const boxbox = useRef();
    const playerRef = useRef();
    const [playerData, setPlayerData] = useState<any>(null);
    
    const [squeezestartLeft, setSqueezeStartLeft] = useState<boolean>(false);
    const [squeezestartRight, setSqueezeStartRight] = useState<boolean>(false);
    const [moving, setMoving] = useState<boolean>(false);
    
    useEffect(() => {
        socket_connection.on("login", data => {
            setPlayerData(data);
            Userdata.set(p=> data.id);
            console.log(data);
            console.log("connessione fatta")
        });
        player.scale.x = 1.5;
        player.scale.y = 1.5;
        player.scale.z = 1.5;
        
    }, [])


    useXREvent('squeezestart', (e) => setSqueezeStartLeft(true), { handedness: "left" })
    useXREvent('squeezeend', (e) => setSqueezeStartLeft(false), { handedness: "left" })
    useXREvent('squeezestart', (e) => setSqueezeStartRight(true), { handedness: "right" })
    useXREvent('squeezeend', (e) => setSqueezeStartRight(false), { handedness: "right" })
    

    useXREvent("selectstart",()=> {
        console.log(rightController?.inputSource.gamepad);
        console.log(rightController?.inputSource);
        console.log(rightController?.grip);
        console.log(rightController?.controller);
        //rightController?.inputSource.
    }, {handedness:"right"})
    /* const socket = socketIOClient(ENDPOINT);
     socket.on("login", data => {
       console.log(data);
     });*/





    useXRFrame((time, xrFrame) => {
        rightController?.inputSource.gamepad.axes.forEach((axis, index) => {
            //console.log(axis,index);
            //console.log(clock.getDelta())
            if(index == 3){
                if(axis < 0.5 || axis > -0.5){
                    player.position.x +=axis*speed*clock.getDelta();
                }
                /*if(axis > 0.5){
                    player.position.x += speed*clock.getDelta();
                }else if(axis < -0.5){
                    player.position.x -= speed*clock.getDelta();

                }*/
            }
            if(index == 2){
                if(axis < 0.5 || axis > -0.5){
                    player.position.z +=axis*speed*clock.getDelta();
                }
                /*
                if(axis > 0.5){
                    //player.position.z += speed*clock.getDelta();
                }else if(axis < -0.5){
                    //player.position.z -= speed*clock.getDelta();
                }*/
            }

        })
        //console.log(player);
        if(squeezestartLeft && squeezestartRight){
    
        }else{

        }
        // do something on each frame of an active XR session
        if (leftController && rightController && playerData !== null) {

            const dataToSend = {
                //id: playerData.id,
                ...playerData,
                head: {
                    type: "headset",
                    position: {
                        x: player.position.x,
                        y: player.position.y,
                        z: player.position.z
                    },
                    rotation: {
                        x: player.rotation.x,
                        y: player.rotation.y,
                        z: player.rotation.z
                    }
                },
                leftController: {
                    type: "controller",
                    position: {
                        x: leftController.controller.position.x,
                        y: leftController.controller.position.y,
                        z: leftController.controller.position.z,
                    },
                    rotation: {
                        x: leftController.controller.rotation.x,
                        y: leftController.controller.rotation.y,
                        z: leftController.controller.rotation.z,
                    }
                },
                rightController: {
                    type: "controller",
                    position: {
                        x: rightController.controller.position.x,
                        y: rightController.controller.position.y,
                        z: rightController.controller.position.z,
                    },
                    rotation: {
                        x: rightController.controller.rotation.x,
                        y: rightController.controller.rotation.y,
                        z: rightController.controller.rotation.z,
                    }
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
            <Hands />
            
            <DefaultXRControllers />
        </group>
        </>
    )
}