import { getArr } from "../../services/getArr"
import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";

type SpreadsheetProps = {
	rows: number;
	columns: number;
}

type GridContext = {
	[key: string]: string
}

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {

	const gridContext: GridContext = {}
	const columnsArr = getArr(columns, true);
	const rowsArr = getArr(rows);

	columnsArr.forEach(column => {
		rowsArr.forEach(arr => {
			const key = `${column}${arr}`
			gridContext[key] = ""
		})
	})

	console.log({
		gridContext
	})

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