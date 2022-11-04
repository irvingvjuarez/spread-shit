import { useState } from "react"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => setEditMode(prev => !prev)

	if (editMode) return (
		<td>
			<input
				autoFocus
				type="text"
				className="w-[90px] p-1 outline-none"
				onBlur={toggleEditMode}
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