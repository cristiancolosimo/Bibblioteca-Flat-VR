import * as THREE from 'three';
import cover1 from '../../cover/cover1.jpg';
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';

const modelPath = "/assets/model/libro/libro_multi_material.glb"

export default function Libro(props:any) {
  const group = useRef();
  const { nodes, materials } = useGLTF(modelPath);
  const colorMap = useLoader(TextureLoader, cover1);

  
  //const texture = useLoader(THREE.TextureLoader, cover1);
  //const texture = useTexture(cover1);
  //console.log(texture)
  //texture.rotation = Math.PI/12;
  //texture.repeat = {x:0,y:0};
  
  return (
    <group ref={group} {...props} dispose={null}>
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
         {/* <meshStandardMaterial    map={colorMap}   />*/}
        </mesh>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001_2.geometry}
          material={materials.Retro}
        />
      </group>
    </group>
  );
}

useGLTF.preload(modelPath);