import { FunctionsListProps } from "./types"

export const FunctionsList: React.FC<FunctionsListProps> = ({ list }) => {
	const handleClick = () => {
		console.log("Hi")
	}

	return (
		<ul className="functions-list">
			{list.map(item =>
				<li onClick={handleClick} className="functions-item" key={item}>
					{item}
				</li>
			)}
		</ul>
	)
}