export default function Floor(){
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <boxBufferGeometry attach={"geometry"} args={[20, 20,1]} />
        <meshLambertMaterial attach="material" color="white" />
      </mesh>
 
    )
}