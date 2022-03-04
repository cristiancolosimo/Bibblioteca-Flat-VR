import { useEffect, useState } from "react";

export default function Wall(props:any){


    
    return (  <mesh rotation={[0, 0, 0]} position={[0,5,0]} {...props} >
        <boxBufferGeometry attach={"geometry"} args={[20, 10,1]} />
        <meshLambertMaterial attach="material" color={props.color? props.color : "red"} />
      </mesh>)
}

