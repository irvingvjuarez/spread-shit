import { getArr } from "../../services/getArr"
import { Row } from "../../components/Row"

type SpreadsheetProps = {
	rows: number;
	columns: number;
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {

	const columnsArr = getArr(columns, true)

	return (
		<section>
			<table>
				<thead>
					<Row>
						{columnsArr.map(column => (
							<td className="cell font-bold">
								{column}
							</td>
						))}
					</Row>
				</thead>

				<tbody>
					{getArr(rows).map(row => (
						<Row row={row as number} key={row}>
							{columnsArr.map(column => (
								<td className="p-1 cell">
									{column} / {row}
								</td>
							))}
						</Row>
					))}
				</tbody>
			</table>
		</section>
	)
}