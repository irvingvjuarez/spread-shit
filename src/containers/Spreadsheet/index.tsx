import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";
import { SpreadsheetProps } from "./types"
import { useSpreadsheet } from "../../hooks/useSpreadsheet";
import { GridContext } from "../../contexts/GridContext";

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {
	const { columnsArr, rowsArr, gridState, dispatch } = useSpreadsheet({ rows, columns })
	const spreadSheetProviderValue = { gridState, dispatch }

	return (
		<section>
			<GridContext.Provider value={spreadSheetProviderValue}>
				<table className="relative">
					<thead className="cell-head top-0">
						<Row>
							{columnsArr.map(column =>
								<Cell
									className="cell head-top font-bold text-center"
									key={column}
								>
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
										key={column}
										cellID={`${column}${row}`}
										className="text-start px-1 cell"
										isHead={true}
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