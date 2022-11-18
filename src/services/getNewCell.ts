type Position = "left" | "right" | "up" | "down"

const getRowValue = (current: string | number, moveTo: Omit<Position, "left" | "right">) => {
	current = Number(current)
	const updated = moveTo === "up" ? current - 1 : current + 1
	return String(updated)
}

export const getNewCell = (currentID: string, position: Position) => {
	let newValue = "", charCode

	const isXAxis = (position === "left" || position === "right")
	const replaceFromTo: [number, number] = isXAxis ? [0,1] : [1,currentID.length]
	const replaceable = currentID?.substring(...replaceFromTo) as string

	switch(position) {
		case "down":
			newValue = getRowValue(replaceable, position)
		break;
		case "up":
			newValue = getRowValue(replaceable, position)
		break;
		case "left":
			charCode = replaceable.charCodeAt(0)
			newValue = String.fromCharCode(charCode - 1)
		break;
		case "right":
			charCode = replaceable.charCodeAt(0)
			newValue = String.fromCharCode(charCode + 1)
		break;
	}

	const newClassname = currentID?.replace(replaceable, newValue) as string
	return newClassname
	// const upCell = document.querySelector("." + upClassName)
}