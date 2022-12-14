import { GridMovements } from "../types"

const columnMovements: GridMovements[] = ["Tab", "Shift+Tab", "ArrowLeft", "ArrowRight"]

const getRowValue = (current: string | number, moveTo: Omit<GridMovements, "Tab">) => {
	current = Number(current)
	const updated = moveTo === "ArrowUp" ? current - 1 : current + 1
	return String(updated)
}

const getColumnValue = (columnLetter: string, position: Omit<GridMovements, "ArrowUp" | "ArrowDown">) => {
	const currentCharCode = columnLetter.charCodeAt(0)
	const newCharCode = (position === "Tab" || position === "ArrowRight") ? currentCharCode + 1 : currentCharCode - 1
	const newValue = String.fromCharCode(newCharCode)
	return newValue
}

export const moveInGrid = (currentID: string, movement: GridMovements) => {
	let newValue = ""

	const isColumnMovement = columnMovements.includes(movement)
	const replaceFromTo: [number, number] = isColumnMovement ? [0,1] : [1,currentID.length]
	const replaceable = currentID?.substring(...replaceFromTo) as string

	if (isColumnMovement) {
		newValue = getColumnValue(replaceable, movement)
	} else {
		newValue = getRowValue(replaceable, movement)
	}

	try {
		const newClassname = currentID?.replace(replaceable, newValue) as string
		const nextCell: HTMLTableCellElement | null = document.querySelector("." + newClassname)

		if(nextCell) {
			nextCell.click()
		}
	} catch(err) {
		// The expected cell to reach is not a valid one
	}
}