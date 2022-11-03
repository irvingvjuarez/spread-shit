const firstAlphabetLetterCode = 65 // A

export const getArr = (size: number, returnLetter?: boolean) => {
	return new Array(size)
		.fill(0)
		.map((_item, index) => returnLetter ? String.fromCharCode(index + firstAlphabetLetterCode) : index)
}