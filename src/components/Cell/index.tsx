import { useContext, useEffect, useRef, useState } from "react"
import { GridContext } from "../../contexts/GridContext"
import { useCell } from "../../hooks/useCell"
import { GridContent } from "../../hooks/useSpreadsheet/types"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur }) => {
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => setEditMode(prev => !prev)
	const handleBlur = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		toggleEditMode()
		if (onBlur) {
			onBlur(evt.target.value)
		}
	}
	// const gridContent = useContext(GridContext) as GridContent
	// const { editMode, handleBlur, toggleEditMode, gridState } = useCell(id)
	const gridContent = useContext(GridContext) as GridContent

	if (editMode) return (
		<td>
			<input
				autoFocus
				type="text"
				className="w-[90px] px-1 outline-none"
				onBlur={handleBlur}
				defaultValue={children}
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