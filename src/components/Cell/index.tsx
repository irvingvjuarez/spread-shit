import { useState } from "react"
import { GRID_MOVEMENTS } from "../../globals"
import { moveInGrid } from "../../services/moveInGrid"
import { GridMovements } from "../../types"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, cellID }) => {
	const [editMode, setEditMode] = useState(false)
	const [keyRecord, setKeyRecord] = useState("")
	const toggleEditMode = () => {
		if (isHead) setEditMode(prev => !prev)
	}

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

	const handleBlur = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		toggleEditMode()
		if (onBlur) {
			onBlur(evt.target.value)
		}
	}

	if (editMode) return (
		<td>
			<input
				autoFocus
				type="text"
				className={`w-[90px] px-1 inset-1 ${cellID}`}
				onBlur={handleBlur}
				defaultValue={inputValue}
				onKeyDown={viewKeyCode}
			/>
		</td>
	)

	return (
		<td className={`${cellID} ${className}`} onClick={toggleEditMode}>
			<>
				{children}
			</>
		</td>
	)
}