export type Action = {
	type: string;
	payload?: unknown
}

export type UpdatePayload = {
	id: string;
	content: string;
}