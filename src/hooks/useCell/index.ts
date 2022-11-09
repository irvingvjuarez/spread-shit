import { useContext, useReducer, useState } from "react"
import { GridContext } from "../../contexts/GridContext"
import { GridContent } from "../useSpreadsheet/types"
import { gridReducer } from "@app/reducers/grid/grid.reducer"

export const useCell = (id?: string) => {
	const gridContent = useContext(GridContext) as GridContent
	const [gridState, dispatch] = useReducer(gridReducer, gridContent)

	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => setEditMode(prev => !prev)
	const handleBlur = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		toggleEditMode()
		if (id) {
			const payload = { id, value: evt.target.value }
			dispatch({ type: "update", payload })
		}
	}

	return {
		editMode,
		handleBlur,
		toggleEditMode,
		gridState
	}
}