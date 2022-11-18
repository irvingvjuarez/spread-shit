type Position = "left" | "right" | "up" | "down"

export const getNewCell = (currentID: string, position: Position) => {
	const isXAxis = (position === "left" || position === "right")
	let newValue = "", charCode
	const rowValue = isXAxis
		? currentID?.substring(0, 1) as string
		: currentID?.substring(1, 2) as string

	switch(position) {
		case "down":
			newValue = String(Number(rowValue) + 1)
		break;
		case "left":
			charCode = rowValue.charCodeAt(0)
			newValue = String.fromCharCode(charCode - 1)
		break;
		case "right":
			charCode = rowValue.charCodeAt(0)
			newValue = String.fromCharCode(charCode + 1)
		break;
		case "up":
			newValue = String(Number(rowValue) - 1)
		break;
	}

	const newClassname = currentID?.replace(rowValue, newValue) as string
	return newClassname
	// const upCell = document.querySelector("." + upClassName)
}