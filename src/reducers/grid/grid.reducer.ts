import { updateGrid } from "../../services/updateGrid"
import { GridContent } from "../../hooks/useSpreadsheet/types"
import { Action, UpdatePayload } from "../../types"
import { GridActions } from "./actions"

export const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case GridActions.update:
			// const newState = updateGrid({ payload, state })
			// return newState
			const newState = {...state}
			let { id, content } = payload as UpdatePayload
			content = content.trim()
			const newComputed = content === "" ? newState[id].computedValue : content
			const newRaw = content === "" ? newState[id].computedValue : content

			newState[id] = {
				computedValue: newComputed,
				rawValue: newRaw,
				dependencies: newState[id].dependencies
			}
			return newState
		default:
			return state
	}
}