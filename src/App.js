import './App.css';
import {useState} from "react";
import {validatorHelper} from "./FunctionHelper";
import {ANSWERS} from "./Const";



function App() {
    const [fileList, setFileList] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files

        const fileListSpreadArray = [...file]
        console.log(fileListSpreadArray)
        const countAllowedAndAbortedFiles = (files) => {

            console.log(files.length)
            let amountOfFreeSpaceForDownloadedFiles = 10 - files.length

            const allowedFiles = files.slice(0, amountOfFreeSpaceForDownloadedFiles)
            const abortedFiles = files.slice(amountOfFreeSpaceForDownloadedFiles)

            const allowedFileArray = allowedFiles.map(currentFile => {
                return validatorHelper(currentFile)
            })

            const abortedFileArray = abortedFiles.map(currentFile => {
                if (currentFile) {
                    const objFilePattern = {
                        file: currentFile,
                        name: currentFile.name,
                        size: currentFile.size,
                    }
                    return {
                        ...objFilePattern,
                        status: ANSWERS.fullArray
                    }
                }
            })

            return [...allowedFileArray, ...abortedFileArray]
        }
        console.log(countAllowedAndAbortedFiles(fileListSpreadArray))

        setFileList(prevState => [...prevState, ...countAllowedAndAbortedFiles()])
    }


    return (
        <div className="App">
            <div className="dropzone" id="droptarget">
                <input className='dropzone'
                       type='file'
                       multiple
                       value=""
                       onDrop={handleDrop}/>Drop file here
            </div>
            <div>{fileList.length === 0
                ? <h1>Files not fined</h1>
                : fileList.map((file, index) => (
                    <div>{index + 1}. <strong>{file.name}</strong>, {file.size} - {file.status}</div>
                ))}
            </div>
        </div>
    );
}


export default App;

