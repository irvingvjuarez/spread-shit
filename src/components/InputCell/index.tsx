import { useInputCell } from "../../hooks/useInputCell"
import { InputCellProps } from "./types"
import { FUNCTIONS_LIST } from "../../globals"

export const InputCell: React.FC<InputCellProps> = ({ cellID, viewKeyCode, toggleEditMode }) => {
	const { 
		inputRef, handleUpdate, inputValue,
		handleChange, showFunctionsList
	} = useInputCell({ cellID, toggleEditMode })

	return (
		<td className="input-cell">
			{showFunctionsList && <ul className="functions-list">
				{FUNCTIONS_LIST.map(item => 
					<li className="functions-item" key={item}>{item}</li>
				)}
			</ul>}

			<input
				ref={inputRef}
				autoFocus
				type="text"
				className={`w-[90px] px-1 inset-1 ${cellID}`}
				onBlur={handleUpdate}
				defaultValue={inputValue}
				onKeyDown={viewKeyCode}
				onChange={handleChange}
			/>
		</td>
	)
}