import { Suspense } from "react";

import { useXRFrame, VRCanvas } from '@react-three/xr';
import Player from './components/Player';
import BackgroundWorld from './components/Background';
import Room1 from './rooms/Room1';
import AnotherPlayers from "./components/AnotherPlayers";



export default function VR() {




  return (
    <div style={{ height: "1000px", width: "100%", position: "relative", background: "#333" }}>
      <Suspense fallback={<span>Caricamento assets...</span>} >
        <VRCanvas >
          <spotLight position={[10, 4, 10]} angle={0.3} />
          <Player />
          <AnotherPlayers/>
          <BackgroundWorld />
          <Room1></Room1>
        </VRCanvas >
      </Suspense>
    </div>
  )
}
