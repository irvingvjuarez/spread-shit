import { getArr } from "../../services/getArr";
import { GridContent, UseSpreadsheetProps } from "./types";

export const useSpreadsheet = (props: UseSpreadsheetProps) => {
	const { columns, rows } = props;

	const gridContent: GridContent = {}
	const columnsArr = getArr(columns, true);
	const rowsArr = getArr(rows);

	columnsArr.forEach(column => {
		rowsArr.forEach(arr => {
			const key = `${column}${arr}`
			gridContent[key] = ""
		})
	})

	return {
		columnsArr,
		rowsArr,
		gridContent
	}
}