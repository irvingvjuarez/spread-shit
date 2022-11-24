import { useContext } from "react"
import { GridContext } from "../../contexts/GridContext"
import { REFERENCE_REGEXP } from "../../globals"
import { SpreadsheetState } from "../../hooks/useSpreadsheet/types"
import { GridActions } from "../../reducers/grid/actions"
import { InputCellProps } from "./types"

export const InputCell: React.FC<InputCellProps> = ({ cellID, viewKeyCode, toggleEditMode }) => {
	let referenceMatches = []
	const { dispatch, gridState } = useContext(GridContext) as SpreadsheetState
	const inputValue = gridState[cellID || ""].rawValue

	const handleUpdate = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		const { value } = evt.target
		const payload = {id: cellID, content: value}
		toggleEditMode()
		dispatch({ type: GridActions.update, payload })
	}

	const watchReferences = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = evt.target
		if (inputValue.charAt(0) === "=") {
			const currentReferences = inputValue.match(REFERENCE_REGEXP) || []

			if (currentReferences.length > 0) {
				currentReferences.forEach(match => {
					const element = document.querySelector(`.${match.toUpperCase()}`)
					element?.classList.add("cell-highlighted")
				})
			}
		}
	}

	return (
		<td>
			<input
				autoFocus
				type="text"
				className={`w-[90px] px-1 inset-1 ${cellID}`}
				onBlur={handleUpdate}
				defaultValue={inputValue}
				onKeyDown={viewKeyCode}
				onChange={watchReferences}
			/>
		</td>
	)
}