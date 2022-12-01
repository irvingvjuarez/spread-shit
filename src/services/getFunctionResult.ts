import { FUNCTIONS_LIST } from "../globals";
import { GridContent } from "../hooks/useSpreadsheet/types";
import { functionTypeRegexp, referenceRegexp } from "../regexps";

type GetFunctionResultConfig = {
	match: string;
	id: string;
	state: GridContent;
	newState: GridContent;
}

export const getFunctionResult = (config: GetFunctionResultConfig) => {
	const { match, state, newState, id } = config

	const functionMatchReferences = match.match(referenceRegexp)

	const functionID = match.match(functionTypeRegexp)?.[0];
	const functionObj = FUNCTIONS_LIST.find(item => item.name === functionID)

	const columnID = functionMatchReferences?.[0].substring(0,1)
	const from = functionMatchReferences?.[0].substring(1, functionMatchReferences?.[0].length)
	const to = functionMatchReferences?.[1].substring(1, functionMatchReferences?.[1].length)

	let cellsArr = [];
	const cellReferences = []

	for(let i = Number(from); i <= Number(to); i++){
		const currentCellID = columnID + String(i)
		cellReferences.push(currentCellID)
		cellsArr.push(state[currentCellID])
	}

	cellsArr = cellsArr.map(cell => Number(cell.computedValue))
	const functionResult = functionObj?.fn(cellsArr)

	cellReferences.forEach(reference => {
		reference = reference.toUpperCase()

		const refInDeps = newState[reference].dependencies.includes(id)
		if (!refInDeps) {
			newState[reference].dependencies.push(id)
		}
	})

	return functionResult
}