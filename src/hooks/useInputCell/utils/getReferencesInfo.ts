import { REFERENCE_REGEXP } from "../../../globals"
import { FUNCTION_REGEXP } from "../../../regexps"
import { GetReferencesIntoConfig } from "../types"

export const getReferencesInfo = (config: GetReferencesIntoConfig) => {
	const {inputValue, referenceMatches} = config

	// functions info
	const functionMatchesReferences = []
	const functionMatches = inputValue.match(FUNCTION_REGEXP) || []
	const isFunction = functionMatches.length > 0;
	if (isFunction) {
		functionMatches.forEach(match => {
			const matchReferences = match.match(REFERENCE_REGEXP)
			const from = matchReferences?.[0]
			const to = matchReferences?.[1]
			const matchColumn = from?.substring(0,1) === to?.substring(0,1) ? to?.substring(0,1) : null
			const matchConfig = { matchColumn, from, to }
			console.log(matchConfig)
		})
	}

	const currentReferences = inputValue.match(REFERENCE_REGEXP) || []
	const referencesSameSize = currentReferences.length === referenceMatches.length
	const referencesSameMatches = currentReferences.every(ref => referenceMatches.includes(ref))

	const equalReferences = referencesSameMatches && referencesSameSize
	const matchesFound = currentReferences.length > 0

	return {
		equalReferences,
		matchesFound,
		currentReferences
	}
}