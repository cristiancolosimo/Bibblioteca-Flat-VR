import * as THREE from 'three';
export function decostructVector(_vector:THREE.Vector3 | THREE.Euler){
    return {x:_vector.x, y:_vector.y, z:_vector.z}
 }