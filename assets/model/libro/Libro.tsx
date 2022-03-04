import * as THREE from 'three';
import cover1 from '../../cover/cover1.jpg';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import { useBox } from '@react-three/cannon';

const modelPath = "/assets/model/libro/libro_multi_material.glb"

export default function Libro(props:any) {
  //const group = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  const copertina_Loaded = props.copertina != undefined ? useLoader(TextureLoader, props.copertina) : null;
  const retro_Loaded = props.retro != undefined ? useLoader(TextureLoader, props.retro) : null;

  //const [ref,api]  = useBox(()=>({mass:1,...props}))
  
  //const texture = useLoader(THREE.TextureLoader, props.copertina);
  //const texture = useTexture(.);
  //console.log(texture)
  //texture.rotation = Math.PI/12;
  //texture.repeat = {x:0,y:0};
  
  return (
    <group  {...props} dispose={null}>
      <group position={[0.46, 0.42, 0.8]} scale={[0.24, 0.36, 0.05]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={materials.allbase}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_1.geometry}
          material={materials.Copertina}
          
        >
          {}
          {props.copertina != undefined ? <meshStandardMaterial  map={copertina_Loaded}   /> : null}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.Retro}
        >
          {props.retro != undefined ? <meshStandardMaterial  map={retro_Loaded}   /> : null}
        

        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);