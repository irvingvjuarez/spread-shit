import { useCell } from "../../hooks/useCell"
import { useGridMovement } from "../../hooks/useGridMovement"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, onBlur, inputValue, isHead, cellID }) => {
	const { viewKeyCode } = useGridMovement(cellID)
	const { editMode, handleBlur, toggleEditMode } = useCell({isHead, onBlur})

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