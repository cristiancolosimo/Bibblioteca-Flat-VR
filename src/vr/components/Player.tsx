import { OrbitControls } from "@react-three/drei";
import { useStore } from "@react-three/fiber";
import { Hands, DefaultXRControllers, useXR, useController, useXREvent, useXRFrame } from "@react-three/xr";
import { useEffect, useState } from "react";
import { socket_connection } from "../../api/communication";

import {useState as useHookState} from '@hookstate/core'
import { GlobalUserdata } from "../../api/globals";


export default function Player() {
    const Userdata = useHookState(GlobalUserdata);
    const { controllers, player, isPresenting,isHandTracking } = useXR()
    const rightController = useController('right');
    const leftController = useController('left');

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

    }, [])


    useXREvent('squeezestart', (e) => setSqueezeStartLeft(true), { handedness: "left" })
    useXREvent('squeezeend', (e) => setSqueezeStartLeft(false), { handedness: "left" })
    useXREvent('squeezestart', (e) => setSqueezeStartRight(true), { handedness: "right" })
    useXREvent('squeezeend', (e) => setSqueezeStartRight(false), { handedness: "right" })

    /* const socket = socketIOClient(ENDPOINT);
     socket.on("login", data => {
       console.log(data);
     });*/





    useXRFrame((time, xrFrame) => {
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
    //controllers[0]?.inputSource
    //const leftController = useController('left')
    //const rightController = useController('right')

    //useXREvent('select', (e) => alert(controllers[0].inputSource.gamepad))
    useEffect(() => {
        /*  player.position.y = +1
          player.position.x = -6.7;
          player.position.z = 8;
          player.rotation.y =Math.PI /2;
        
      
              controllers[0].controller.position.y = 1
              controllers[0].controller.position.x = -6.7;
              controllers[0].controller.position.z = 8;
              controllers[0].controller.rotation.y =Math.PI /2;
      
              controllers[1].controller.position.y = 1
              controllers[1].controller.position.x = -6.7;
              controllers[1].controller.position.z = 8;
              controllers[1].controller.rotation.y =Math.PI /2;
      
              */
        //controllers[1].controller.rotation 

    }, [])
    /* useXRFrame((time,xrframe)=>{
            
    })*/
    return (
        <>
            <OrbitControls></OrbitControls>
            <Hands />
            <DefaultXRControllers />
        </>
    )
}