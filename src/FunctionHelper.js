import {ANSWERS, MAX_size} from "./Const";

export const validatorHelper = (file) => {

    const objFilePattern = {
        file: file,
        name: file.name,
        size: file.size,
    }

    const nameFileWithoutType = file.name.split('.').slice(-1).join('.')

    if (!(nameFileWithoutType.endsWith('docx') || nameFileWithoutType.endsWith('pdf'))) {
        return {
           ...objFilePattern,
            status: ANSWERS.wrongType
        }
    }

    if (file.size > MAX_size) {
        return {
            ...objFilePattern,
            status: ANSWERS.bigSize
        }
    }

    if (file.name.length > 15) {
        return {
            ...objFilePattern,
            status: ANSWERS.bigName
        }
    }

    return {
        ...objFilePattern,
        status: ANSWERS.success
    }

}