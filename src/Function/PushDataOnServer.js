import {ANSWERS} from "../Const";

export function pushDataOnTheServer(filesArray) {
    return filesArray.map(async (currentFile) => {
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
                    return {...currentFile, status: ANSWERS.success}
                }
            }
        } catch {

        }
    })
}