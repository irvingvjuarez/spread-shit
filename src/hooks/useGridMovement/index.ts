import { useState } from "react";
import { GRID_MOVEMENTS } from "../../globals";
import { moveInGrid } from "../../services/moveInGrid";
import { GridMovements } from "../../types";

export const useGridMovement = (cellID: string | undefined) => {
	const [keyRecord, setKeyRecord] = useState("")
	const viewKeyCode = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		const keyValue = evt.key;

		if(keyValue === "Shift") {
			setKeyRecord(keyValue)
			return
		} else if (keyValue === "Tab") {
			evt.preventDefault()

			if(keyRecord === "Shift"){
				moveInGrid(cellID as string, "Shift+Tab")
				setKeyRecord("")
				return
			}
		}

		const isKeyValueAMovement = GRID_MOVEMENTS.includes(keyValue)

		if (isKeyValueAMovement){
			moveInGrid(cellID as string, keyValue as GridMovements)
		}
	}

	return {
		viewKeyCode
	}
}