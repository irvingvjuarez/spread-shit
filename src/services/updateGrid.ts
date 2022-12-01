import { FUNCTIONS_LIST } from "../globals";
import { GridContent } from "../hooks/useSpreadsheet/types";
import { REFERENCE_REGEXP, FUNCTION_REGEXP, FUNCTION_TYPE_REGEXP } from "../regexps"
import { GetNewValuesConfig, UpdatePayload } from "../types";
import { getFunctionResult } from "./getFunctionResult";
import { updateDependencies } from "./updateDependencies"

type UpdateGridConfig = {
	payload: unknown;
	state: GridContent
}

const getNewValues = (config: GetNewValuesConfig) => {
	let { value, newState, id, state } = config
	let computedValue: undefined | string
	value = value.trim()

	const isOperation = value.charAt(0) === "="
	const references: string[] | null = value.match(REFERENCE_REGEXP)
	const functionMatches = value.match(FUNCTION_REGEXP)

	if (functionMatches && isOperation){
		computedValue = value.replaceAll(FUNCTION_REGEXP, (match) => getFunctionResult({
			match,
			id,
			state,
			newState
		}))
	} else if (references && isOperation) {
		computedValue = value
		references.forEach(reference => {
			reference = reference.toUpperCase()

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

	return {
		rawValue: value,
		computedValue
	}
}

export const updateGrid = (config: UpdateGridConfig) => {
	const {payload, state} = config
	let {id, content} = payload as UpdatePayload

	const newState = {...state}

	const {rawValue, computedValue} = getNewValues({ value: content, newState, id, state })

	newState[id].rawValue = rawValue
	newState[id].computedValue = String(computedValue)

	if (newState[id].dependencies.length > 0) {
		newState[id] = updateDependencies({ newState, id, state, getNewValues })
	}

	return newState
}