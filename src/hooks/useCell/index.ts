import { useState } from "react"
import { UseCellConfig } from "./types"

export const useCell = (config: UseCellConfig) => {
	const [editMode, setEditMode] = useState(false)
	const { isHead, onBlur } = config

	const toggleEditMode = () => {
		if (isHead) setEditMode(prev => !prev)
	}

	const handleBlur = (evt: React.FocusEvent<HTMLInputElement, Element>) => {
		toggleEditMode()
		if (onBlur) {
			onBlur(evt.target.value)
		}
	}

	return {
		editMode,
		toggleEditMode,
		handleBlur
	}
}