export const Capitalize = (str) => {
    return str.length ? str.charAt(0).toUpperCase() + str.slice(1) : str
}

export const UpperCase = (str) => {
    return str.length ? str.toUpperCase() : str
}

export const Trim = (str, count) => {
    return `${str.slice(0, count)} ...`
}