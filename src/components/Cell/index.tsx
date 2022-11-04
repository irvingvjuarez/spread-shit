import { CellProps } from "./types"

export const Cell: React.FC<CellProps> = ({ children, className }) => {
	return (
		<td className={className}>
			<>
				{children}
			</>
		</td>
	)
}