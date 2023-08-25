import {validatorHelper} from "./FunctionHelper";
import {ANSWERS} from "../Const";

export   const countAllowedAndAbortedFiles = (files, currentFileListSize) => {

    console.log(files.length)

    let amountOfFreeSpaceForDownloadedFiles = 10 - currentFileListSize.length

    const allowedFiles = files.slice(0, amountOfFreeSpaceForDownloadedFiles)
    const abortedFiles = files.slice(amountOfFreeSpaceForDownloadedFiles)

    const allowedFileArray = allowedFiles.map(currentAllowedFile => {
        return validatorHelper(currentAllowedFile)
    })

    const abortedFileArray = abortedFiles.map(currentAbortedFile => {
        if (currentAbortedFile) {
            const objFilePattern = {
                file: currentAbortedFile,
                name: currentAbortedFile.name,
                size: currentAbortedFile.size,
            }
            return {
                ...objFilePattern,
                status: ANSWERS.fullArray
            }
        }
    })

    return [...allowedFileArray, ...abortedFileArray]
}