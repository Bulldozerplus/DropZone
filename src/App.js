import './App.css';
import {useState} from "react";
import {validatorHelper} from "./FunctionHelper";


function App() {
    const [fileList, setFileList] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files

        const arrFileList = [...file].map(currentFile => {

                const objFilePattern = {
                    file: currentFile,
                    name: currentFile.name,
                    size: currentFile.size,
                }


                const nameFile = currentFile.name
                const sizeFile = currentFile.size
                const nameFileWithoutType = currentFile.name.split('.').slice(-1).join('.')

               return  validatorHelper(sizeFile,nameFile,nameFileWithoutType,objFilePattern)

            }
        )
        setFileList(prevState => [...prevState, ...arrFileList])
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

