export function pushDataOnTheServer(filesArray) {
    return filesArray.map(async (currentFile) => {
        const formData = new FormData()
        formData.append('file', currentFile.file)
        return await fetch('http://localhost:4003/files/save', {
            method: 'POST',
            body: formData
        })
    })
}