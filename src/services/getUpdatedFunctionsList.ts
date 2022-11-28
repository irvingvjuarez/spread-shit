import { FUNCTIONS_LISTNAMES } from "../globals"

export const getUpdatedFunctionsList = (inputValue: string) => {
	const updatedList = FUNCTIONS_LISTNAMES.filter(functionName => {
		functionName = functionName.toLowerCase()
		return functionName?.includes(inputValue.toLowerCase())
	})

	return updatedList
}