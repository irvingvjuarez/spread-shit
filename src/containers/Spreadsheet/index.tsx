import { getArr } from "../../services/getArr"

type SpreadsheetProps = {
	rows: number;
	columns: number;
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {

	return (
		<section>
			<table>
				<tbody>
					{getArr(rows, true).map(row => (
						<tr>
							{getArr(columns).map(column => (
								<td className="p-1 border-2 border-black">
									{row} / {column}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</section>
	)
}