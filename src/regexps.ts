export const REFERENCE_REGEXP = new RegExp("[A-Z][1-9]{1,3}", "ig")
export const FUNCTION_REGEXP = /[A-z]{2,5}\(\s?[A-z][1-9]{1,3}\s?\:\s?[A-z][1-9]{1,3}\s?\)/ig
export const FUNCTION_TYPE_REGEXP = new RegExp("[A-z]{2,5}", "ig")