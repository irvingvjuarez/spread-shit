import { useContext, useEffect, useRef } from "react"
import { GridContext } from "../../contexts/GridContext"
import { REFERENCE_REGEXP } from "../../globals"
import { GridActions } from "../../reducers/grid/actions"
import { unhighlightCells } from "../../services/unhighlightCells"
import { SpreadsheetState } from "../useSpreadsheet/types"
import { UseInputCellConfig } from "./types"

export const useInputCell = (config: UseInputCellConfig) => {
	const { cellID, toggleEditMode } = config

	let referenceMatches = []
	const inputRef = useRef<null | HTMLInputElement>(null)
	const { dispatch, gridState } = useContext(GridContext) as SpreadsheetState
	const inputValue = gridState[cellID || ""].rawValue

	useEffect(() => {
		watchReferences()
	}, [])

	const handleUpdate = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		const { value } = evt.target
		const payload = {id: cellID, content: value}

		unhighlightCells()
		toggleEditMode()
		dispatch({ type: GridActions.update, payload })
	}

	const watchReferences = () => {
		const { value: inputValue } = inputRef.current as HTMLInputElement
		if (inputValue.charAt(0) === "=") {
			const currentReferences = inputValue.match(REFERENCE_REGEXP) || []

			if (currentReferences.length > 0) {
				if (currentReferences.length !== referenceMatches.length) {
					unhighlightCells()
				}

				referenceMatches = [...currentReferences]
				referenceMatches.forEach(match => {
					match = match.toUpperCase()
					const element = document.querySelector(`.${match}`)
					element?.classList.add("cell-highlighted")
				})
			}
		}
	}

	return {
		inputRef,
		handleUpdate,
		inputValue,
		watchReferences
	}
}