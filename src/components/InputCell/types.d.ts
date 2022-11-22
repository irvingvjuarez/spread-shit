export type InputCellProps = {
	cellID: string | undefined,
	handleBlur: (evt: React.FocusEvent<HTMLInputElement, Element>) => void,
	inputValue: string | undefined,
	viewKeyCode: (evt: React.KeyboardEvent<HTMLInputElement>) => void
}