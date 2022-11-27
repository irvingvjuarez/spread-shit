import { FunctionsListProps } from "./types"

export const FunctionsList: React.FC<FunctionsListProps> = ({ list, onSelectFunction }) => {
	const selectFunction = (name: string) => () => {
		onSelectFunction(name)
	}

	return (
		<ul className="functions-list">
			{list.map(functionName =>
				<li
					onClick={selectFunction(functionName)}
					className="functions-item"
					key={functionName}
				>
					{functionName}
				</li>
			)}
		</ul>
	)
}