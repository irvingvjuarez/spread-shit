import { REFERENCE_REGEXP } from "../../../globals"
import { GetReferencesIntoConfig } from "../types"

export const getReferencesInfo = (config: GetReferencesIntoConfig) => {
	const {inputValue, referenceMatches} = config

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