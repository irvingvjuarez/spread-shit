import { getArr } from "../../services/getArr"
import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";
import { SpreadsheetProps } from "./types"
import { useSpreadsheet } from "../../hooks/useSpreadsheet";


export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {
	const { columnsArr, rowsArr } = useSpreadsheet({ rows, columns })

	return (
		<section>
			<table>
				<thead>
					<Row>
						{columnsArr.map(column =>
							<Cell className="cell font-bold" key={column}>
								{column as string}
							</Cell>
						)}
					</Row>
				</thead>

				<tbody>
					{rowsArr.map(row => (
						<Row row={row as number} key={row}>
							{columnsArr.map(column =>
								<Cell className="p-1 cell" key={column} id={`${column}${row}`}>
									{`${column} / ${row}`}
								</Cell>
							)}
						</Row>
					))}
				</tbody>
			</table>
		</section>
	)
}