import { FUNCTIONS_LIST } from "../../globals"

export const FunctionsList = () => {
	return (
		<ul className="functions-list">
			{FUNCTIONS_LIST.map(item =>
				<li className="functions-item" key={item}>
					{item}
				</li>
			)}
		</ul>
	)
}