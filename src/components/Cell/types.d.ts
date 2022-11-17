export type CellProps = {
	children?: string;
	className?: string;
	onBlur?: (content: string) => void;
	inputValue?: string;
	isHead?: boolean;
	indexValue?: number;
}