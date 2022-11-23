import { InputCellProps } from "./types"

export const InputCell: React.FC<InputCellProps> = ({ cellID, handleBlur, inputValue, viewKeyCode }) => {
	const watchReferences = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { value: inputValue } = evt.target
		if (inputValue.charAt(0) === "=") {
			console.log({
				inputValue
			})
		}
	}

	return (
		<td>
			<input
				autoFocus
				type="text"
				className={`w-[90px] px-1 inset-1 ${cellID}`}
				onBlur={handleBlur}
				defaultValue={inputValue}
				onKeyDown={viewKeyCode}
				onChange={watchReferences}
			/>
		</td>
	)
}