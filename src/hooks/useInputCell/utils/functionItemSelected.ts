const itemClassname = ".functions-item"

export const functionItemSelected = () => {
	const functionItems = [...document.querySelectorAll(itemClassname)]
	const itemsOnHover = functionItems.filter(item => item.matches(":hover"))
	const itemSelected = itemsOnHover.length > 0

	return { functionItems, itemsOnHover, itemSelected }
}