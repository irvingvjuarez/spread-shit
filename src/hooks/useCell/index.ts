import { useContext, useState } from "react"
import { GridContext } from "../../contexts/GridContext"

export const useCell = (id?: string) => {
	const gridState = useContext(GridContext)
	const [editMode, setEditMode] = useState(false)
	const toggleEditMode = () => setEditMode(prev => !prev)
	const handleBlur = () => {
		toggleEditMode()
		if (id) {
			console.log(gridState)
		}
	}

	return {
		editMode,
		handleBlur,
		toggleEditMode
	}
}