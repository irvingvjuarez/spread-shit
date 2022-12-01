export const referenceRegexp = new RegExp("[A-Z][1-9]{1,3}", "ig")
export const functionRegexp = /[A-z]{2,5}\(\s?[A-z][1-9]{1,3}\s?\:\s?[A-z][1-9]{1,3}\s?\)/ig
export const functionTypeRegexp = new RegExp("[A-z]{2,5}", "ig")