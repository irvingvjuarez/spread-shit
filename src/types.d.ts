export type Action = {
	type: string;
	payload?: unknown
}

export type UpdatePayload = {
	id: string;
	content: string;
}

export type GridMovements =
	| "ArrowUp"
	| "ArrowDown"
	| "Tab"