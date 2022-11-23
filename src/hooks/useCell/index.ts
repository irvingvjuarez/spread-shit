import { useState } from "react"
import { UseCellConfig } from "./types"

export const useCell = (config: UseCellConfig) => {
	const [editMode, setEditMode] = useState(false)
	const { isHead } = config

	const toggleEditMode = () => {
		if (isHead) setEditMode(prev => !prev)
	}

	return {
		editMode,
		toggleEditMode
	}
}