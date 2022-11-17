import { RowProps } from "./types"

export const Row: React.FC<RowProps> = ({ children, row, className }) => {
	return (
		<tr className={`${className && className}`}>
			<td className={`cell text-center cell-head left-0 ${row && "font-bold"}`}>
				{row ?? null}
			</td>

			<>
				{children}
			</>
		</tr>
	)
}