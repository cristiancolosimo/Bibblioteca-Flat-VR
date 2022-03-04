import { Stars } from "@react-three/drei";

export default function BackgroundWorld() {
    return (
        <>
            <Stars />
            <ambientLight intensity={0.5} />
        </>

    )
}