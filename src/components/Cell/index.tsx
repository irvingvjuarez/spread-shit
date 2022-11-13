import { useContext, useEffect, useRef } from "react"
import { GridContext } from "../../contexts/GridContext"
import { useCell } from "../../hooks/useCell"
import { GridContent } from "../../hooks/useSpreadsheet/types"
import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className }) => {
	// const gridContent = useContext(GridContext) as GridContent
	// const { editMode, handleBlur, toggleEditMode, gridState } = useCell(id)
	const gridContent = useContext(GridContext) as GridContent

	// if (editMode) return (
	// 	<td>
	// 		<input
	// 			autoFocus
	// 			type="text"
	// 			className="w-[90px] px-1 outline-none"
	// 			onBlur={handleBlur}
	// 			defaultValue={gridContent[id as string].rawValue}
	// 		/>
	// 	</td>
	// )

	return (
		<td className={className} onClick={() => console.log("Edit mode")}>
			<>
				{children}
			</>
		</td>
	)
}