import { GridMovements } from "./types";

export const GRID_MOVEMENTS: Array<GridMovements | string> = ["ArrowDown", "ArrowUp", "Tab"]
export const SPECIAL_GRID_MOVEMENTS = ["ArrowLeft", "ArrowRight"]

export const REFERENCE_REGEXP = new RegExp("[A-z]{1,1}[0-9]{1,3}", "g")

export const FUNCTIONS_LIST = [
	{
		name: "SUM",
		fn: (arr: number[], initialValue = 0) => {
			return arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
		}
	},
	{
		name: "AVG",
		fn: (arr: number[], initialValue = 0) => {
			const sum = arr.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue)
			return sum / arr.length
		}
	}
]
export const FUNCTIONS_LISTNAMES = FUNCTIONS_LIST.map(item => item.name)