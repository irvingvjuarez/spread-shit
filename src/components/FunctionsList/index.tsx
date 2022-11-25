import { FunctionsListProps } from "./types"

export const FunctionsList: React.FC<FunctionsListProps> = ({ list }) => {
	return (
		<ul className="functions-list">
			{list.map(item =>
				<li className="functions-item" key={item}>
					{item}
				</li>
			)}
		</ul>
	)
}