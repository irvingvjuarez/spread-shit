import { createContext } from "react";
import { GridContent } from "../../hooks/useSpreadsheet/types";

export const GridContext = createContext<null | GridContent>(null)