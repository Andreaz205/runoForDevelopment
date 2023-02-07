const serverStoragePath = process.env.REACT_APP_SERVER_URL

export const imagePathBuilder = (path: string) => {
    return serverStoragePath + '/storage/' + path
}