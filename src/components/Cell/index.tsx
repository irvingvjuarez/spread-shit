import { useState } from "react"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, indexValue }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => {
		console.log("Checking keyboard clicks")
		if (isHead) setEditMode(prev => !prev)
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
				className="w-[90px] px-1 inset-1"
				onBlur={handleBlur}
				defaultValue={inputValue}
			/>
		</td>
	)

	return (
		<td className={className} onClick={toggleEditMode} tabIndex={indexValue}>
			<>
				{children}
			</>
		</td>
	)
}