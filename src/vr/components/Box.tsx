export default function Box(props:any) {
    return (
      <mesh>
        <boxBufferGeometry attach={"geometry"} />
        <meshLambertMaterial attach={"material"} color={props.color  ? props.color:"hotpink"} />
      </mesh>
    )
  }
  