import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";
import { SpreadsheetProps } from "./types"
import { useSpreadsheet } from "../../hooks/useSpreadsheet";
import { GridContext } from "../../contexts/GridContext";

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {
	const { columnsArr, rowsArr, gridContent, gridState } = useSpreadsheet({ rows, columns })
	console.log(gridState)

	return (
		<section>
			<GridContext.Provider value={gridState}>
				<table>
					<thead>
						<Row>
							{columnsArr.map(column =>
								<Cell className="cell font-bold text-center" key={column}>
									{column as string}
								</Cell>
							)}
						</Row>
					</thead>

					<tbody>
						{rowsArr.map(row => (
							<Row row={row as number} key={row}>
								{columnsArr.map(column =>
									<Cell
										className="text-start px-1 cell"
										key={column}
									>
										{gridState[`${column}${row}`].computedValue}
									</Cell>
								)}
							</Row>
						))}
					</tbody>
				</table>
			</GridContext.Provider>
		</section>
	)
}