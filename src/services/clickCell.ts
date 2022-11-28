export const clickCell = (cellClassname: string) => {
	const cellElement = document.querySelector(`.${cellClassname}`) as HTMLTableCellElement
	cellElement?.click()
}