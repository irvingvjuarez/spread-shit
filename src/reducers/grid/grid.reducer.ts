import { GridContent } from "../../hooks/useSpreadsheet/types"
import { Action } from "../../types"
import { GridActions } from "./actions"

export const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case GridActions.update:
			let {id, value} = payload as any
			let computedValue
			value = value.trim()

			const isOperation = value.charAt(0) === "="
			const newState = {...state}

			try {
				computedValue = isOperation ? eval(value.replace("=", "")) : value
			} catch(err) {
				computedValue = "#ERROR"
			}

			newState[id].rawValue = value
			newState[id].computedValue = String(computedValue)

			return newState
		default:
			return state
	}
}