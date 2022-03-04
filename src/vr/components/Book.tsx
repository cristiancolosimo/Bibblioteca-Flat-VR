import { Interactive, useXREvent, useXRFrame } from "@react-three/xr";
import { useRef, useState } from "react";
import Libro from "../../../assets/model/libro/Libro";

export default function Book(props:any){   
    let bigRef = useRef();
    let ref = useRef();
    let [bookHover, setBookHover] = useState<boolean>(false);
    //let [controllerHover, setControllerHover] = useState<any>(null);
    useXREvent("selectstart",(e)=>{
        if(bookHover)
        //setControllerHover(true);
        e.controller.controller.attach(ref.current);
    })

    useXREvent("selectend",(e)=>{
        bigRef.current.attach(ref.current);
    })
    return (
        <mesh ref={bigRef}>
        <mesh ref={ref}>
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