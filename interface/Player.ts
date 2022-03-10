import { AdvancedSpatialData } from "./SpatialData";

export interface Player {
    id: string,
    color:string,
    head:AdvancedSpatialData,
    leftController : AdvancedSpatialData,
    rightController: AdvancedSpatialData
}