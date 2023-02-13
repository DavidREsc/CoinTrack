export const setLocalStorageItem = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

export const getLocalStorageItem = (key: string) => {
    return localStorage.getItem(key)
}
