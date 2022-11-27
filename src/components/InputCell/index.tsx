import { useInputCell } from "../../hooks/useInputCell"
import { InputCellProps } from "./types"
import { FunctionsList } from "../FunctionsList"
import { ConditionalNode } from "../ConditionalNode"

export const InputCell: React.FC<InputCellProps> = ({ cellID, viewKeyCode, toggleEditMode }) => {
	const {
		inputRef, handleUpdate, inputValue, handleSelectFunction,
		handleChange, showFunctionsList, functionsList
	} = useInputCell({ cellID, toggleEditMode })

	return (
		<td className="input-cell">
			<ConditionalNode condition={showFunctionsList}>
				<FunctionsList
					list={functionsList}
					onSelectFunction={handleSelectFunction}
				/>
			</ConditionalNode>

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