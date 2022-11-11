import { updateGrid } from "../../services/updateGrid"
import { GridContent } from "../../hooks/useSpreadsheet/types"
import { Action } from "../../types"
import { GridActions } from "./actions"

export const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case GridActions.update:
			const newState = updateGrid({ payload, state })
			return newState
		default:
			return state
	}
}