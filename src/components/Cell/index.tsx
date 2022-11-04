import { useCell } from "../../hooks/useCell"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className, id }) => {
	const { editMode, handleBlur, toggleEditMode, gridState } = useCell(id)

	if (editMode) return (
		<td>
			<input
				autoFocus
				type="text"
				className="w-[90px] px-1 outline-none"
				onBlur={handleBlur}
				defaultValue={gridState[id as string].rawValue}
			/>
		</td>
	)

	return (
		<td className={className} onClick={toggleEditMode}>
			<>
				{id ? gridState[id].computedValue : children}
			</>
		</td>
	)
}