import { useContext, useReducer, useState } from "react"
import { GridContext } from "../../contexts/GridContext"
import { Action } from "../../types"
import { GridContent } from "../useSpreadsheet/types"

const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case "update":
			let {id, value} = payload as any
			value = value.trim()

			const isOperation = value.charAt(0) === "="
			const usingEval = isOperation ? eval(value.replace("=", "")) : value

			const newState = {...state}
			newState[id].rawValue = value
			newState[id].computedValue = String(usingEval)

			return newState
		default:
			return state
	}
}

export const useCell = (id?: string) => {
	const gridContent = useContext(GridContext) as GridContent
	const [gridState, dispatch] = useReducer(gridReducer, gridContent)

	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => setEditMode(prev => !prev)
	const handleBlur = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		toggleEditMode()
		if (id) {
			dispatch({
				type: "update",
				payload: {
					id,
					value: evt.target.value
				}
			})
		}
	}

	return {
		editMode,
		handleBlur,
		toggleEditMode,
		gridState
	}
}