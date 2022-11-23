export type GridContent = {
	[key: string]: {
		computedValue: string;
		rawValue: string;
		dependencies: string[]
	}
}

export type SpreadsheetState = {
	dispatch: React.Dispatch<Action>,
	gridState: GridContent
}

export type UseSpreadsheetProps = {
	rows: number;
	columns: number;
}