import  { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const modelPath = "/assets/model/room1/room1v2.glb"



export default function Room1(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF(modelPath);
    return (
      <group ref={group} {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.bibblioteca_room_1.geometry}
          material={nodes.bibblioteca_room_1.material}
          scale={0.89}
        />
      </group>
    );
  }
  
  useGLTF.preload(modelPath);
  
  