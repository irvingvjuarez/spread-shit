import { useReducer } from "react";
import { gridReducer } from "../../reducers/grid/grid.reducer";
import { getArr } from "../../services/getArr";
import { Action } from "../../types";
import { GridContent, UseSpreadsheetProps } from "./types";

export const useSpreadsheet = (props: UseSpreadsheetProps) => {
	const { columns, rows } = props;

	const gridContent: GridContent = {}
	const columnsArr = getArr(columns, true);
	const rowsArr = getArr(rows);

	columnsArr.forEach(column => {
		rowsArr.forEach(arr => {
			const key = `${column}${arr}`
			gridContent[key] = {
				computedValue: "",
				rawValue: "",
				dependencies: []
			}
		})
	})

	const [gridState, dispatch] = useReducer<React.Reducer<GridContent, Action>>(gridReducer, gridContent)

	return {
		columnsArr,
		rowsArr,
		gridContent,
		gridState
	}
}