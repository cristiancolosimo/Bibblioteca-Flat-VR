import { Interactive, useXREvent, useXRFrame } from "@react-three/xr";
import { useRef, useState } from "react";
import Libro from "../../../assets/model/libro/Libro";
import { socket_connection } from "../../api/communication";

export default function Book(props:any){   
    let bigRef : any= useRef();
    let ref : any= useRef();
    let [bookHover, setBookHover] = useState<boolean>(false);
    let [grabbed, setGrabbed] = useState<boolean>(false);
    //let [controllerHover, setControllerHover] = useState<any>(null);
    useXREvent("selectstart",(e)=>{
        if(bookHover){
            e.controller.controller.attach(ref.current);
            //setGrabbed(true);
        }
        //setControllerHover(true);
    })
    useXRFrame((time,xrframe)=>{
        
        if(grabbed){
            const dataToSend = {
                ...props.bookdata,
                spatialData: {
                    type:"object",
                    grabbed:true,
                    rotation: {
                        x:ref.current.rotation.x,
                        y:ref.current.rotation.y,
                        z:ref.current.rotation.y,
                    },
                    position: {
                        x:ref.current.position.x,
                        y:ref.current.position.y,
                        z:ref.current.position.z,
                    }
                }
            }
            console.log(dataToSend);
            socket_connection.emit("location_object",dataToSend);
    
        }
    })
    useXREvent("selectend",(e)=>{
        //setGrabbed(false);
        bigRef.current.attach(ref.current);
        console.log(ref.current);
        console.log(bigRef.current);

        const dataToSend = {
            ...props.bookdata,
            spatialData: {
                type:"object",
                grabbed:false,

                rotation: {
                    x:ref.current.rotation.x,
                    y:ref.current.rotation.y,
                    z:ref.current.rotation.y,
                },
                position: {
                    x:ref.current.position.x,
                    y:ref.current.position.y,
                    z:ref.current.position.z,
                }
            }
        }
        console.log(dataToSend);
        socket_connection.emit("location_object",dataToSend);
    });
    return (
        <mesh ref={bigRef}>
        <mesh ref={ref} position={[props.bookdata.spatialData.position.x,props.bookdata.spatialData.position.y,props.bookdata.spatialData.position.z]} rotation={[props.bookdata.spatialData.rotation.x,props.bookdata.spatialData.rotation.y,props.bookdata.spatialData.rotation.z]}> 
        <Interactive   onHover={(e)=> {
            console.log("evento azzionato",e);
            setBookHover(true);
        }} onBlur={(e)=>{
            setBookHover(false);
        }}>
        <Libro  {...props} />
        </Interactive>
        </mesh>
        </mesh>)
}