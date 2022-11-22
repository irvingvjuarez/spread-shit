import { useState } from "react";
import { GRID_MOVEMENTS } from "../../globals";
import { moveInGrid } from "../../services/moveInGrid";
import { GridMovements } from "../../types";

const getNextMovement = (keyValue: string, keyRecord: string) => {
	const isTab = keyValue === "Tab"
	const isEnter = keyValue === "Enter"
	const isShift = keyValue === "Shift"
	const isReverseTab = isTab && keyRecord === "Shift"
	const isKeyValueAMovement = GRID_MOVEMENTS.includes(keyValue)
	const isValidMovement = isKeyValueAMovement && !isReverseTab

	return {
		isEnter,
		isShift,
		isReverseTab,
		isTab,
		isValidMovement
	}
}

export const useGridMovement = (cellID: string | undefined) => {
	const [keyRecord, setKeyRecord] = useState("")

	const viewKeyCode = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		const keyValue = evt.key;
		const { isTab, isEnter, isShift, isReverseTab, isValidMovement } = getNextMovement(keyValue, keyRecord)
		if (isTab) evt.preventDefault()

		if (isEnter) moveInGrid(cellID as string, "ArrowDown")
		if (isShift) setKeyRecord(keyValue)
		if (isValidMovement) moveInGrid(cellID as string, keyValue as GridMovements)
		if (isReverseTab) {
			moveInGrid(cellID as string, "Shift+Tab")
			setKeyRecord("")
		}
	}

	return {
		viewKeyCode
	}
}