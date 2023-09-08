import {ANSWERS} from "../Const";
import {serverFetch} from "../Servises/URlservices";

export async function pushDataOnTheServer(filesArray) {
    const promises = filesArray.map(async (currentFile) => {
        try {
            if (currentFile.status === ANSWERS.inProcess) {
                const formData = new FormData()
                formData.append('file', currentFile.file)
                const push = await serverFetch.pushFiles(formData)
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