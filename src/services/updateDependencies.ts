import { GridContent } from "../hooks/useSpreadsheet/types"
import { GetNewValuesConfig } from "../types"

type UpdateDependenciesConfig = {
	newState: GridContent;
	id: string;
	state: GridContent;
	getNewValues: (config: GetNewValuesConfig) => {
		rawValue: string,
		computedValue: string | undefined
	}
}

export const updateDependencies = (config: UpdateDependenciesConfig) => {
	const { newState, id, state, getNewValues } = config
	const currentCell = newState[id]

	currentCell.dependencies.forEach(dep => {
		const depValue = state[dep].rawValue
		const { rawValue: depRaw, computedValue: depComputed } = getNewValues({
			value: depValue,
			id: dep,
			newState,
			state
		})

		newState[dep].rawValue = depRaw
		newState[dep].computedValue = String(depComputed)

		const recursiveUpdating = newState[dep].dependencies.length > 0
		if(recursiveUpdating){
			newState[dep] = updateDependencies({
				...config,
				id: dep
			})
		}
	})

	return currentCell
}