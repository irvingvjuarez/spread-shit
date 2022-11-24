import { ConditionalNodeProps } from "./types"

export const ConditionalNode: React.FC<ConditionalNodeProps> = ({ condition, children }) => {
	if (condition) return <>{children}</>

	return null
}