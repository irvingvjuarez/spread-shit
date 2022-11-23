import { Cell } from "../../components/Cell"
import { Row } from "../../components/Row"
import { GridHeadProps } from "./types"

export const GridHead: React.FC<GridHeadProps> = ({ columnsArr }) => {
	return(
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
	)
}