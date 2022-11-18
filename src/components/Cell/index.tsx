import { useState } from "react"
import { GRID_MOVEMENTS } from "../../globals"
import { moveInGrid } from "../../services/moveInGrid"
import { GridMovements } from "../../types"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, cellID }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => {
		if (isHead) setEditMode(prev => !prev)
	}

	const viewKeyCode = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		const keyValue = evt.key;
		const isKeyValueAMovement = GRID_MOVEMENTS.includes(keyValue)

		if (isKeyValueAMovement){
			const nextCell = moveInGrid(cellID as string, keyValue as GridMovements)
			console.log(nextCell)
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