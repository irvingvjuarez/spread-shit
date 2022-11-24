import { useInputCell } from "../../hooks/useInputCell"
import { InputCellProps } from "./types"

export const InputCell: React.FC<InputCellProps> = ({ cellID, viewKeyCode, toggleEditMode }) => {
	const { inputRef, handleUpdate, inputValue, handleChange } = useInputCell({ cellID, toggleEditMode })

	return (
		<td>
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