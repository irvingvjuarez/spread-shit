import { createContext } from "react";
import { SpreadsheetState } from "../../hooks/useSpreadsheet/types";

export const GridContext = createContext<null | SpreadsheetState>(null)