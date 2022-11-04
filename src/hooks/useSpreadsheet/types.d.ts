export type GridContent = {
	[key: string]: {
		computedValue: string;
		rawValue: string;
	}
}

export type UseSpreadsheetProps = {
	rows: number;
	columns: number;
}