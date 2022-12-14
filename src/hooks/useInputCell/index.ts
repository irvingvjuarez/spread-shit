import { useContext, useEffect, useRef, useState } from "react"
import { GridContext } from "../../contexts/GridContext"
import { FUNCTIONS_LISTNAMES, REFERENCE_REGEXP } from "../../globals"
import { GridActions } from "../../reducers/grid/actions"
import { clickCell } from "../../services/clickCell"
import { getUpdatedFunctionsList } from "../../services/getUpdatedFunctionsList"
import { unhighlightCells } from "../../services/unhighlightCells"
import { SpreadsheetState } from "../useSpreadsheet/types"
import { UseInputCellConfig } from "./types"
import { functionItemSelected } from "./utils/functionItemSelected"
import { getReferencesInfo } from "./utils/getReferencesInfo"
import { highlightCells } from "./utils/highlightCells"

export const useInputCell = (config: UseInputCellConfig) => {
	const [showFunctionsList, setShowFunctionsList] = useState(false)
	const [functionsList, setFunctionsList] = useState(FUNCTIONS_LISTNAMES)
	const { cellID, toggleEditMode } = config

	let referenceMatches: string[] = []

	const inputRef = useRef<null | HTMLInputElement>(null)
	const { dispatch, gridState } = useContext(GridContext) as SpreadsheetState
	const inputValue = gridState[cellID || ""].rawValue

	const getInputValue = () => {
		const inputValue = inputRef.current?.value || ""
		const isOperation = (inputValue?.charAt(0) === "=")

		return { inputValue, isOperation }
	}

	useEffect(() => {
		handleChange()
	}, [])

	const handleSelectFunction = (functionName: string) => {
		const payload = {id: cellID, content: `${inputValue}${functionName}()`}

		toggleEditMode()
		dispatch({ type: GridActions.update, payload })
		setTimeout(() => clickCell(cellID as string), 0)
	}

	const handleUpdate = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		const value = evt.target.value.replaceAll(REFERENCE_REGEXP, (match) => match.toUpperCase())
		const payload = {id: cellID, content: value}
		const { itemSelected } = functionItemSelected()

		unhighlightCells()
		dispatch({ type: GridActions.update, payload })

		if(!itemSelected) {
			toggleEditMode()
		}
	}

	const handleChange = () => {
		watchReferences()
		watchFunctions()
	}

	const watchFunctions = () => {
		const {inputValue, isOperation} = getInputValue()
		setShowFunctionsList(isOperation)

		if (isOperation) {
			const actualInputValue = inputValue?.substring(1, inputValue.length)

			if (actualInputValue) {
				const newFunctionsList = getUpdatedFunctionsList(actualInputValue)
				const isUpdatedListEmpty = newFunctionsList.length < 1
				const updatedListChanged = newFunctionsList.length != functionsList.length

				if (isUpdatedListEmpty)  setShowFunctionsList(false)
				if (updatedListChanged) setFunctionsList(newFunctionsList)
			} else {
				setFunctionsList(FUNCTIONS_LISTNAMES)
			}
		}
	}

	const watchReferences = () => {
		const {inputValue, isOperation} = getInputValue()

		if (isOperation) {
			const referencesInfo = getReferencesInfo({ inputValue, referenceMatches })
			const {
				equalReferences,
				matchesFound,
				currentReferences,
				functionMatchesReferences
			} = referencesInfo

			if (!equalReferences) unhighlightCells()

			if (matchesFound) {
				referenceMatches = currentReferences.concat(functionMatchesReferences)
				highlightCells(referenceMatches)
			}
		}
	}

	return {
		inputRef,
		handleUpdate,
		inputValue,
		handleChange,
		showFunctionsList,
		functionsList,
		handleSelectFunction
	}
}