import { useContext } from "react"
import { Cell } from "../../components/Cell"
import { Row } from "../../components/Row"
import { GridContext } from "../../contexts/GridContext"
import { SpreadsheetState } from "../../hooks/useSpreadsheet/types"
import { GridBodyProps } from "./types"

export const GridBody: React.FC<GridBodyProps> = ({ rowsArr, columnsArr }) => {
	const { gridState } = useContext(GridContext) as SpreadsheetState

	return (
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
	)
}