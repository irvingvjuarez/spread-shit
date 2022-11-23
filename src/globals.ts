import { GridMovements } from "./types";

export const GRID_MOVEMENTS: Array<GridMovements | string> = ["ArrowDown", "ArrowUp", "Tab"]
export const SPECIAL_GRID_MOVEMENTS = ["ArrowLeft", "ArrowRight"]

export const REFERENCE_REGEXP = new RegExp("[A-z]{1,1}[0-9]{1,3}", "g")