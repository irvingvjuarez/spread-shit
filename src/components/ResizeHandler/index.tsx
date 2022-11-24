export const ResizeHandler = () => {
    const handleResizing = () => {
        // TODO: create the functionality of the resizing
    }

    const stopResizing = () => {
        // TODO: Make the functionality to stop resizing
        // https://stackoverflow.com/questions/8960193/how-to-make-html-element-resizable-using-pure-javascript
    }

    return(
        <span
            onKeyDown={handleResizing}
            onKeyUp={stopResizing}
            className="resize-handler"
        ></span>
    )
}