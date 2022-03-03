import  { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const modelPath = "/assets/model/libreria/libreria.glb"

export default function Libreria(props:any) {
  const group = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.libreria.geometry}
        material={materials.Material}
        scale={[0.77, 1, 1]}
      />
    </group>
  );
}

useGLTF.preload(modelPath);

