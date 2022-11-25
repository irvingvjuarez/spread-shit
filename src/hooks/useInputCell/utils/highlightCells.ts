export const highlightCells = (cellsIDS: string[]) => {
	cellsIDS.forEach(cellID => {
		cellID = cellID.toUpperCase()
		const element = document.querySelector(`.${cellID}`)
		element?.classList.add("cell-highlighted")
	})
}