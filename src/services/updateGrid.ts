import { GridContent } from "../hooks/useSpreadsheet/types";
import { referenceRegexp } from "../regexps"
type UpdateGridConfig = {
	payload: unknown;
	state: GridContent
}

export const updateGrid = (config: UpdateGridConfig) => {
	const {payload, state} = config

	let {id, value} = payload as any
	let computedValue: undefined | string
	value = value.trim()

	const isOperation = value.charAt(0) === "="
	const newState = {...state}
	const references: string[] | null = value.match(referenceRegexp)

	if (references && isOperation) {
		computedValue = value
		references.forEach(reference => {
			const refInDeps = newState[reference].dependencies.includes(id)
			if (!refInDeps) {
				newState[reference].dependencies.push(id)
			}
			const referenceValue = state[reference.toUpperCase()].computedValue
			computedValue = (computedValue as string).replace(reference, referenceValue)
		})
	}

	try {
		const valueToUse = computedValue ?? value
		computedValue = isOperation ? eval(valueToUse.replace("=", "")) : valueToUse
	} catch(err) {
		computedValue = "#ERROR"
	}

	newState[id].rawValue = value
	newState[id].computedValue = String(computedValue)

	return newState
}