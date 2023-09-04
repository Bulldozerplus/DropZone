import {ANSWERS} from "../Const";

export async function pushDataOnTheServer(filesArray) {
    const promises = filesArray.map(async (currentFile) => {
        try {
            if (currentFile.status === ANSWERS.inProcess) {
                const formData = new FormData()
                formData.append('file', currentFile.file)
                const push = await fetch('http://localhost:4003/files/save', {
                        method: 'POST',
                        body: formData
                    }
                )
                if (push.ok) {
                    currentFile.status = ANSWERS.success
                    return currentFile
                }
            }
        } catch {
            return currentFile
        }
    })
    await Promise.all(promises)
}