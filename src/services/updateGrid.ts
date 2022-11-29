import { FUNCTIONS_LIST } from "../globals";
import { GridContent } from "../hooks/useSpreadsheet/types";
import { referenceRegexp, functionRegexp, functionTypeRegexp } from "../regexps"
import { UpdatePayload } from "../types";

type UpdateGridConfig = {
	payload: unknown;
	state: GridContent
}

type GetNewValuesConfig = {
	value: string;
	newState: GridContent;
	id: string;
	state: GridContent;
}

const getNewValues = (config: GetNewValuesConfig) => {
	let { value, newState, id, state } = config
	let computedValue: undefined | string
	value = value.trim()

	const isOperation = value.charAt(0) === "="
	const references: string[] | null = value.match(referenceRegexp)
	const functionMatches = value.match(functionRegexp)

	if (functionMatches && isOperation){
		const functionID = value.match(functionTypeRegexp)?.[0];
		const functionObj = FUNCTIONS_LIST.find(item => item.name === functionID)

		const columnID = references?.[0].substring(0,1)
		const from = references?.[0].substring(1, references?.[0].length)
		const to = references?.[1].substring(1, references?.[1].length)

		let cellsArr = [];
		for(let i = Number(from); i <= Number(to); i++){
			const currentCellID = columnID + String(i)
			cellsArr.push(state[currentCellID])
		}

		cellsArr = cellsArr.map(cell => Number(cell.computedValue))
		const functionResult = functionObj?.fn(cellsArr)

		computedValue = String(functionResult)
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
		newState[id].dependencies.forEach(dep => {
			const depValue = state[dep].rawValue
			const { rawValue: depRaw, computedValue: depComputed } = getNewValues({
				value: depValue,
				id: dep,
				newState,
				state
			})

			newState[dep].rawValue = depRaw
			newState[dep].computedValue = String(depComputed)
		})
	}

	return newState
}