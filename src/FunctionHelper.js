import {ANSWERS, MAX_size} from "./Const";

export const validatorHelper = (file, nameFile, objFile) => {

    if (!(file.name.endsWith('docx') || file.name.endsWith('pdf'))) {
        return {
            objFile,
            status: ANSWERS.wrongType
        }
    }

    if (file.size > MAX_size) {
        return {
            ...objFile,
            status: ANSWERS.bigSize
        }
    }

    if (nameFile.length > 15) {
        return {
            ...objFile,
            status: ANSWERS.bigName
        }
    }

    return {
        ...objFile,
        status: ANSWERS.success
    }

}