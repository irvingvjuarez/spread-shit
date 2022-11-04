import { getArr } from "../../services/getArr";
import { GridContext, UseSpreadsheetProps } from "./types";

export const useSpreadsheet = (props: UseSpreadsheetProps) => {
	const { columns, rows } = props;

	const gridContext: GridContext = {}
	const columnsArr = getArr(columns, true);
	const rowsArr = getArr(rows);

	columnsArr.forEach(column => {
		rowsArr.forEach(arr => {
			const key = `${column}${arr}`
			gridContext[key] = ""
		})
	})

	return {
		columnsArr,
		rowsArr
	}
}