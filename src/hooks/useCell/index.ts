import { useContext, useReducer, useState } from "react"
import { GridContext } from "../../contexts/GridContext"
import { Action } from "../../types"
import { GridContent } from "../useSpreadsheet/types"

const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case "update":
			const {id, value} = payload as any
			const newState = {...state}
			newState[id] = value
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