import {ANSWERS, MAX_size} from "./Const";

export const validatorHelper = (sizeFile, nameFile, nameFileWithoutType, objFile) => {

    if (!(nameFileWithoutType.endsWith('docx') || nameFileWithoutType.endsWith('pdf'))) {
        return {
           ...objFile,
            status: ANSWERS.wrongType
        }
    }

    if (sizeFile > MAX_size) {
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