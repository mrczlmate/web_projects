export function focusInputToEnd(inputRef, value) {
    if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(value.length, value.length)
    }
}