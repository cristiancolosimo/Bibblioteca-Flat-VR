export default function Plane() {
    return (
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeBufferGeometry attach={"geometry"} args={[100, 100]} />
        <meshLambertMaterial attach="material" color="red" />
      </mesh>
    )
  }
  