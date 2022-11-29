import { GridContent } from "./hooks/useSpreadsheet/types";

export type Action = {
	type: string;
	payload?: unknown
}

export type UpdatePayload = {
	id: string;
	content: string;
}

export type GetNewValuesConfig = {
	value: string;
	newState: GridContent;
	id: string;
	state: GridContent;
}

export type GridMovements =
	| "ArrowUp"
	| "ArrowDown"
	| "ArrowLeft"
	| "ArrowRight"
	| "Tab"
	| "Shift+Tab"