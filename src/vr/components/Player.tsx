import { OrbitControls } from "@react-three/drei";
import { useStore } from "@react-three/fiber";
import { Hands, DefaultXRControllers, useXR, useController, useXREvent, useXRFrame } from "@react-three/xr";
import { useEffect, useState } from "react";
import { socket_connection } from "../../api/communication";




export default function Player() {
    const { controllers, player, isPresenting } = useXR()
    const rightController = useController('right');
    const leftController = useController('left');  
    
    const [playerData, setPlayerData] = useState<any>(null);

    useEffect(()=>{
        socket_connection.on("login", data => {
            setPlayerData(data);
            console.log(data);
            console.log("connessione fatta")
        });    

    },[])

    
    useXREvent('squeeze', (e) => {
        console.log('squeeze event has been triggered')
    })
   /* const socket = socketIOClient(ENDPOINT);
    socket.on("login", data => {
      console.log(data);
    });*/

    


    
    useXRFrame((time, xrFrame) => {
        // do something on each frame of an active XR session
        if(leftController && rightController  && playerData !== null){

            const dataToSend = {
                //id: playerData.id,
                ...playerData,
                head: {
                    type:"headset",
                    position:{
                        x:player.position.x,
                        y:player.position.y,
                        z:player.position.z
                    },
                    rotation: {
                        x:player.rotation.x,
                        y:player.rotation.y,
                        z:player.rotation.z
                    }
                },
                leftController: {
                    type:"controller",
                    position:{
                        x:leftController.grip.position.x,
                        y:leftController.grip.position.y,
                        z:leftController.grip.position.z,
                    },
                    rotation: {
                        x:leftController.grip.rotation.x,
                        y:leftController.grip.rotation.y,
                        z:leftController.grip.rotation.z,
                    }
                },
                rightController: {
                    type:"controller",
                    position:{
                        x:rightController.grip.position.x,
                        y:rightController.grip.position.y,
                        z:rightController.grip.position.z,
                    },
                    rotation: {
                        x:rightController.grip.rotation.x,
                        y:rightController.grip.rotation.y,
                        z:rightController.grip.rotation.z,
                    }
                }
            };
          
          //console.log(dataToSend)
          // console.log(playerData) //rotation //scale
          socket_connection.emit("location_player",dataToSend)
          
          setPlayerData(dataToSend)
        }else{
            //console.log("errore")
           //console.log(playerData)
        }
        if(playerData == null) socket_connection.emit("request_login","dammi i dati");
      });
    //controllers[0]?.inputSource
    //const leftController = useController('left')
    //const rightController = useController('right')

    //useXREvent('select', (e) => alert(controllers[0].inputSource.gamepad))
    useEffect(()=>{
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
       
    },[])
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