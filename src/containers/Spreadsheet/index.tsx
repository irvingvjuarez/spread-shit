import { getArr } from "../../services/getArr"
import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";

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
						{columnsArr.map(column =>
							<Cell className="cell font-bold" key={column}>
								{column as string}
							</Cell>
						)}
					</Row>
				</thead>

				<tbody>
					{getArr(rows).map(row => (
						<Row row={row as number} key={row}>
							{columnsArr.map(column =>
								<Cell className="p-1 cell" key={column}>
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