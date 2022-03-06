import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { OrbitControls, Stars, } from '@react-three/drei'

import Libro from '../../assets/model/libro/Libro'
import Bookself from '../../assets/model/libreria/Libreria'
import { DefaultXRControllers, Hands, RayGrab, VRCanvas } from '@react-three/xr';
import Player from './components/Player';
import BackgroundWorld from './components/Background';
import Room1 from './rooms/Room1';

export default function VR(){
    return (
        <div style={{ height: "1000px", width: "100%", position: "relative", background: "#333" }}>
          <Suspense fallback={<span>Caricamento assets...</span>} >
            <VRCanvas >
                <spotLight position={[10, 4, 10]} angle={0.3} />
                <Player/>
                <BackgroundWorld/>
                <Room1></Room1>
            </VRCanvas >
          </Suspense>
        </div>
      )
}

/**
 * 
 * {
                Array(2).fill(null).map((e, k) => {
                  let m = k;
                 // if(k > 3) m = k-3;
    
                  return (
                    <mesh position={[0, 2 * m, 0]} rotation={[0,-Math.PI/2,0]}>
                      <Bookself />
                      {
                        Array(24).fill(null).map((e, k) => {
                          let l = k;
                          if (k > 11) l -= 12;
    
                          return (<RayGrab>
                            <Libro key={k} position={[0, k > 11 ? -0.9 : 0, l * (-0.14)]} />
                          </RayGrab>)
                        })
                      }
                    </mesh>
                  );
                })
              }

 */