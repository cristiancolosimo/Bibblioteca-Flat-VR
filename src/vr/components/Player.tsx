import { OrbitControls } from "@react-three/drei";
import { Hands, DefaultXRControllers, useXR, useController, useXREvent, useXRFrame } from "@react-three/xr";
import { useEffect } from "react";

export default function Player() {
    const { controllers, player, isPresenting } = useXR()

    useXREvent('squeeze', (e) => {
        console.log(JSON.stringify(e.controller.inputSource.gamepad.axes))
        console.log('squeeze event has been triggered')
    })
    
    //controllers[0]?.inputSource
    //const leftController = useController('left')
    //const rightController = useController('right')

    //useXREvent('select', (e) => alert(controllers[0].inputSource.gamepad))
    useEffect(()=>{
    player.position.y = 1
    player.position.x = -6.7;
    player.position.z = 8;
    player.rotation.y =Math.PI /2;
  /*

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