export type InputCellProps = {
	cellID: string | undefined,
	viewKeyCode: (evt: React.KeyboardEvent<HTMLInputElement>) => void,
	toggleEditMode: () => void
}