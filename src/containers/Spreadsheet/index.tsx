import { SpreadsheetProps } from "./types"
import { useSpreadsheet } from "../../hooks/useSpreadsheet";
import { GridContext } from "../../contexts/GridContext";
import { GridHead } from "../GridHead";
import { GridBody } from "../GridBody";

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
					<GridHead
						columnsArr={columnsArr}
					/>

					<GridBody
						columnsArr={columnsArr}
						rowsArr={rowsArr}
					/>
				</table>
			</GridContext.Provider>
		</section>
	)
}