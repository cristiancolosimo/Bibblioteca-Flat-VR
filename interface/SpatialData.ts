export interface SpatialData{
    x: number,
    y: number,
    z: number
}
export interface AdvancedSpatialData{
    type: "controller"| "hand" | "headset",
    rotation : SpatialData,
    position: SpatialData,
}
