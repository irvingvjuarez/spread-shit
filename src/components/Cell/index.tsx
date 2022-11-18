import { useState } from "react"
import { getNewCell } from "../../services/getNewCell"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, cellID }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => {
		if (isHead) setEditMode(prev => !prev)
	}

	const viewKeyCode = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		const keyValue = evt.key;

		switch(keyValue) {
			case "ArrowUp":
				const upCell = getNewCell(cellID as string, "up")
				console.log(upCell)
			break;
			case "ArrowDown":
				const downCell = getNewCell(cellID as string, "down")
				console.log(downCell)
			break;
			case "Tab":
				const rightCell = getNewCell(cellID as string, "right")
				console.log(rightCell)
			break;
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