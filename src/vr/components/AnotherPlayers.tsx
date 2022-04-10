import { useEffect, useState } from "react";
import { socket_connection } from "../../api/communication";
import Box from "./Box";
import { useState as useHookState } from '@hookstate/core'
import { GlobalUserdata } from "../../api/globals";
import * as THREE from "three";

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
    const Userdata = useHookState(GlobalUserdata);

    const [playersLocation, setPlayersLocation] = useState<Array<Player>>([]);
    useEffect(() => {
        socket_connection.on("location_players", data => {
            setPlayersLocation(Object.values(data));

        });
    }, [])
    let UserLoggedID = Userdata.get();
    //return null;
    return (
        <group>
            {playersLocation.map(player => {
                //if (player.id == UserLoggedID ) return null;
                return <AnotherPlayer {...player} key={player.id} />
            })}
        </group>
    )
}
/**
 * 
  {"id":"ef32b89d-c8d3-4193-bd94-da47e6fefbf2","head":{"type":"headset","position":{"x":-6.7,"y":1,"z":8},"rotation":{"x":0,"y":1.5707963267948966,"z":0}},"leftController":{"type":"controller","position":{"x":2.7015278339385986,"y":1.4800000190734863,"z":-1.1302709579467773},"rotation":{"x":0.6654549523360951,"y":0,"z":0}},"rightController":{"type":"controller","position":{"x":-2.7086071968078613,"y":1.4800000190734863,"z":-0.37107792496681213},"rotation":{"x":0.6654549523360951,"y":0,"z":0}}}
 */
// legacy
//const rightController_position = new THREE.Vector3(props.rightController.position.x, props.rightController.position.y, props.rightController.position.z);
//const leftController_position = new THREE.Vector3(props.leftController.position.x, props.leftController.position.y, props.leftController.position.z);
//const head_rotation = new THREE.Euler(props.head.rotation.x, props.head.rotation.y, props.head.rotation.z);
//const rightController_rotation = new THREE.Euler(props.rightController.rotation.x, props.rightController.rotation.y, props.rightController.rotation.z);
//const leftController_rotation = new THREE.Euler(props.leftController.rotation.x, props.leftController.rotation.y, props.leftController.rotation.z);

function AnotherPlayer(props: any) {
    
    let head_position;
    {
        let { x, y, z } = props.head.position;
        head_position = new THREE.Vector3(x, y, z);
    }

    let rightController_position;
    {
        let { x, y, z } = props.rightController.position;
        rightController_position = new THREE.Vector3(x, y, z);
    }
    let leftController_position;
    {
        let { x, y, z } = props.leftController.position;
        leftController_position = new THREE.Vector3(x, y, z);
    }

    let head_rotation;
    {
        let { x, y, z } = props.head.rotation;
        head_rotation = new THREE.Euler(x, y, z);
    }
    let rightController_rotation;
    {
        let { x, y, z } = props.rightController.rotation;
        rightController_rotation = new THREE.Euler(x, y, z);
    }
    let leftController_rotation;
    {
        let { x, y, z } = props.leftController.rotation;
        leftController_rotation = new THREE.Euler(x, y, z);
    }

    return (
        <group>
            <mesh position={head_position} rotation={head_rotation}>
                <Box color={props.color} />
            </mesh>

            <mesh position={rightController_position} rotation={rightController_rotation}>
                <Box color={props.color} />
            </mesh>
            (<mesh position={leftController_position} rotation={leftController_rotation}>
                <Box color={props.color} />
            </mesh>
        </group>
    )
}