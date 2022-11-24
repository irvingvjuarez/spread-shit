export const unhighlightCells = () => {
	const currentHighlightedCells = document.querySelectorAll(".cell-highlighted")
	currentHighlightedCells.forEach(cell => cell.classList.remove("cell-highlighted"))
}