import { Row } from "../../components/Row"
import { Cell } from "../../components/Cell";
import { SpreadsheetProps } from "./types"
import { useSpreadsheet } from "../../hooks/useSpreadsheet";
import { GridContext } from "../../contexts/GridContext";
import { GridActions } from "../../reducers/grid/actions";

export const Spreadsheet: React.FC<SpreadsheetProps> = ({
	rows,
	columns
}) => {
	const { columnsArr, rowsArr, gridState, dispatch } = useSpreadsheet({ rows, columns })
	const handleUpdate = (id: string) => (content: string) => {
		const payload = {id, content}
		dispatch({ type: GridActions.update, payload })
	}

	return (
		<section>
			<GridContext.Provider value={gridState}>
				<table className="relative">
					<thead className="cell-head top-0">
						<Row>
							{columnsArr.map(column =>
								<Cell className="cell head-top font-bold text-center" key={column}>
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
										onBlur={handleUpdate(`${column}${row}`)}
										inputValue={gridState[`${column}${row}`].rawValue}
										cellDeps={gridState[`${column}${row}`].dependencies}
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