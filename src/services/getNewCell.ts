type Position = "left" | "right" | "up" | "down"

const getRowValue = (current: string | number, moveTo: Omit<Position, "left" | "right">) => {
	current = Number(current)
	const updated = moveTo === "up" ? current - 1 : current + 1
	return String(updated)
}

const getColumnValue = (columnLetter: string, position: Omit<Position, "up" | "down">) => {
	const currentCharCode = columnLetter.charCodeAt(0)
	const newCharCode = position === "left" ? currentCharCode - 1 : currentCharCode + 1
	const newValue = String.fromCharCode(newCharCode)
	return newValue
}

export const getNewCell = (currentID: string, position: Position) => {
	let newValue = ""

	const isColumnMovement = (position === "left" || position === "right")
	const replaceFromTo: [number, number] = isColumnMovement ? [0,1] : [1,currentID.length]
	const replaceable = currentID?.substring(...replaceFromTo) as string

	if (isColumnMovement) {
		newValue = getColumnValue(replaceable, position)
	} else {
		newValue = getRowValue(replaceable, position)
	}

	const newClassname = currentID?.replace(replaceable, newValue) as string
	return newClassname
	// const upCell = document.querySelector("." + upClassName)
}