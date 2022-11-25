import { FUNCTIONS_LIST } from "../globals"

export const getUpdatedFunctionsList = (inputValue: string) => {
	const updatedList = FUNCTIONS_LIST.filter(functionName => {
		functionName = functionName.toLowerCase()
		return functionName?.includes(inputValue.toLowerCase())
	})

	return updatedList
}