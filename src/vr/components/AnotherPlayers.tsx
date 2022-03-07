import { useEffect, useState } from "react";
import { socket_connection } from "../../api/communication";
import Box from "./Box";

interface SpatialData {
    x: number,
    y: number,
    z: number
}
interface AdvancedSpatialData {
    type: "controller" | "hand" | "headset",
    rotation: SpatialData,
    position: SpatialData,
}
interface Player {
    id: string,
    head: AdvancedSpatialData,
    leftController: AdvancedSpatialData,
    rightController: AdvancedSpatialData
}

export default function AnotherPlayers(props: any) {
    const [playersLocation, setPlayersLocation] = useState<Array<Player>>([]);
    useEffect(() => {
        socket_connection.on("location_players", data => {
            setPlayersLocation(Object.values(data));

        });
    }, [])

    return (
        <>
            {playersLocation.map(player => {
                return <AnotherPlayer {...player} key={player.id} />
            })}</>) //playersLocation.;
}
/**
 * 
  {"id":"ef32b89d-c8d3-4193-bd94-da47e6fefbf2","head":{"type":"headset","position":{"x":-6.7,"y":1,"z":8},"rotation":{"x":0,"y":1.5707963267948966,"z":0}},"leftController":{"type":"controller","position":{"x":2.7015278339385986,"y":1.4800000190734863,"z":-1.1302709579467773},"rotation":{"x":0.6654549523360951,"y":0,"z":0}},"rightController":{"type":"controller","position":{"x":-2.7086071968078613,"y":1.4800000190734863,"z":-0.37107792496681213},"rotation":{"x":0.6654549523360951,"y":0,"z":0}}}
 */
function AnotherPlayer(props: any) {
    console.log(props)
    return (
    <group>

<mesh position={[props.leftController.position.x, props.leftController.position.y, props.leftController.position.z]} rotation={[props.leftController.rotation.x,props.leftController.rotation.y,props.leftController.rotation.z]}>
        <Box color={props.color}/>
    </mesh>
    (<mesh position={[props.rightController.position.x, props.rightController.position.y, props.rightController.position.z]} rotation={[props.rightController.rotation.x,props.rightController.rotation.y,props.rightController.rotation.z]}>
        <Box color={props.color}/>
    </mesh>
    </group>)
}