import { RowProps } from "./types"

export const Row: React.FC<RowProps> = ({ children, row }) => {
	return (
		<tr className="border-red-100">
			<td className={`cell text-center ${row && "font-bold"}`}>
				{row ?? null}
			</td>

			<>
				{children}
			</>
		</tr>
	)
}