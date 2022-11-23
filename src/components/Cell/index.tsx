import { useCell } from "../../hooks/useCell"
import { useGridMovement } from "../../hooks/useGridMovement"
import { InputCell } from "../InputCell"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, cellID }) => {
	const { viewKeyCode } = useGridMovement(cellID)
	const { editMode, handleBlur, toggleEditMode } = useCell({isHead, onBlur})

	if (editMode) return (<InputCell
		handleBlur={handleBlur}
		viewKeyCode={viewKeyCode}
		inputValue={inputValue}
		cellID={cellID}
		toggleEditMode={toggleEditMode}
	/>)

	return (
		<td className={`${cellID} ${className}`} onClick={toggleEditMode}>
			<>
				{children}
			</>
		</td>
	)
}