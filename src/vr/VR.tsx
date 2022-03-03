import { Canvas, useLoader } from '@react-three/fiber'
import { Suspense, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { OrbitControls, Stars, } from '@react-three/drei'

import Libro from '../../assets/model/libro/Libro'
import Libreria from '../../assets/model/libreria/Libreria'
import { DefaultXRControllers, Hands, RayGrab, VRCanvas } from '@react-three/xr';


export default function VR(){
    return (
        <div style={{ height: "1000px", width: "100%", position: "relative", background: "#333" }}>
          <Suspense fallback={null}>
    
    
            <VRCanvas >
              <Stars />
              <OrbitControls></OrbitControls>
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 15, 10]} angle={0.3} />
              <Hands />
              <DefaultXRControllers />
    
              {
                Array(2).fill(null).map((e, k) => {
                  let m = k;
                 // if(k > 3) m = k-3;
    
                  return (
                    <mesh position={[0, -2 * m, 0]}>
                      <Libreria />
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
            </VRCanvas >
          </Suspense>
    
        </div>
      )
}