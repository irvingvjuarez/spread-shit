import { useCell } from "../../hooks/useCell"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, id }) => {
	const { editMode, handleBlur, toggleEditMode } = useCell(id)

	if (editMode) return (
		<td>
			<input
				autoFocus
				type="text"
				className="w-[90px] p-1 outline-none"
				onBlur={handleBlur}
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