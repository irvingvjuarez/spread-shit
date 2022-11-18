import { useState } from "react"
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
				const rowValue = cellID?.substring(1, 2) as string
				const newRowValue = String(Number(rowValue) - 1)
				const upClassName = cellID?.replace(rowValue, newRowValue) as string
				const upCell = document.querySelector("." + upClassName)
				upCell?.click()
			break;
			case "ArrowDown":
			break;
			case "Tab":
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