import { useState } from "react"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => {
		setEditMode(prev => !prev)
	}
	const viewKeyCode = (evt: React.KeyboardEvent<HTMLInputElement>) => {
		console.log(evt.key)
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
				onKeyUp={viewKeyCode}
			/>
		</td>
	)

	return (
		<td className={className} onClick={toggleEditMode}>
			<>
				{children}
			</>
		</td>
	)
}