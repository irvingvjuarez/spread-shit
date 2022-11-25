export type UseInputCellConfig = {
	cellID: string | undefined;
	toggleEditMode: () => void;
}

export type GetReferencesIntoConfig = {
	inputValue: string;
	referenceMatches: string[];
}