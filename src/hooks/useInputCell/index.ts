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

	const getInputValue = () => {
		const inputValue = inputRef.current.value
		const isOperation = (inputValue.charAt(0) === "=")

		return { inputValue, isOperation }
	}

	useEffect(() => {
		watchReferences()
	}, [])

	const handleUpdate = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		const value = evt.target.value.replaceAll(REFERENCE_REGEXP, (match) => match.toUpperCase())
		const payload = {id: cellID, content: value}

		unhighlightCells()
		toggleEditMode()
		dispatch({ type: GridActions.update, payload })
	}

	const handleChange = () => {
		watchReferences()
		watchFunctions()
	}

	const watchFunctions = () => {
		const {inputValue, isOperation} = getInputValue()
		if (isOperation) {
			// Show list of functions available
			console.log("Showing list of functions available")
		}
	}

	const watchReferences = () => {
		const {inputValue, isOperation} = getInputValue()
		if (isOperation) {
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
		handleChange
	}
}