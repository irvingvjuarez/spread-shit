import { InputCellProps } from "./types"

export const InputCell: React.FC<InputCellProps> = ({ cellID, handleBlur, inputValue, viewKeyCode }) => {
	return (
		<td>
			<input
				autoFocus
				type="text"
				className={`w-[90px] px-1 inset-1 ${cellID}`}
				onBlur={handleBlur}
				defaultValue={inputValue}
				onKeyDown={viewKeyCode}
			/>
		</td>
	)
}