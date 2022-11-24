import { useCell } from "../../hooks/useCell"
import { useGridMovement } from "../../hooks/useGridMovement"
import { InputCell } from "../InputCell"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, isHead, cellID }) => {
	const { viewKeyCode } = useGridMovement(cellID)
	const { editMode, toggleEditMode } = useCell({isHead})

	if (editMode) return (<InputCell
		viewKeyCode={viewKeyCode}
		cellID={cellID}
		toggleEditMode={toggleEditMode}
	/>)

	return (
		<td className={`${cellID} ${className}`} onClick={toggleEditMode}>
			{!isHead && <span className="resize-handler"></span>}

			<>
				{children}
			</>
		</td>
	)
}