import { GridContent } from "../../hooks/useSpreadsheet/types"
import { Action } from "../../types"
import { GridActions } from "./actions"

const referenceRegexp = new RegExp("[A-Z][1-9]", "ig")

export const gridReducer = (state: GridContent, action: Action) => {
	const { type, payload } = action

	switch(type) {
		case GridActions.update:
			let {id, value} = payload as any
			let computedValue
			value = value.trim()

			const isOperation = value.charAt(0) === "="
			const newState = {...state}
			const references: string[] | null = value.match(referenceRegexp)

			if (references && isOperation) {
				references.forEach(reference => {
					const referenceValue = state[reference.toUpperCase()].computedValue
					value = value.replace(reference, referenceValue)
				})
			}

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