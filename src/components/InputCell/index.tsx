import { useContext, useEffect, useRef } from "react"
import { GridContext } from "../../contexts/GridContext"
import { REFERENCE_REGEXP } from "../../globals"
import { SpreadsheetState } from "../../hooks/useSpreadsheet/types"
import { GridActions } from "../../reducers/grid/actions"
import { unhighlightCells } from "../../services/unhighlightCells"
import { InputCellProps } from "./types"

export const InputCell: React.FC<InputCellProps> = ({ cellID, viewKeyCode, toggleEditMode }) => {
	let referenceMatches = []
	const inputRef = useRef<null | HTMLInputElement>(null)
	const { dispatch, gridState } = useContext(GridContext) as SpreadsheetState
	const inputValue = gridState[cellID || ""].rawValue

	useEffect(() => {
		watchReferences()
	}, [])

	const handleUpdate = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		unhighlightCells()

		const { value } = evt.target
		const payload = {id: cellID, content: value}
		toggleEditMode()
		dispatch({ type: GridActions.update, payload })
	}

	const watchReferences = () => {
		const { value: inputValue } = inputRef.current as HTMLInputElement
		if (inputValue.charAt(0) === "=") {
			const currentReferences = inputValue.match(REFERENCE_REGEXP) || []

			if (currentReferences.length > 0) {
				referenceMatches = [...currentReferences]
				referenceMatches.forEach(match => {
					match = match.toUpperCase()
					const element = document.querySelector(`.${match}`)
					element?.classList.add("cell-highlighted")
				})
			}
		}
	}

	return (
		<td>
			<input
				ref={inputRef}
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