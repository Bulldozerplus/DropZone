import './App.css';
import {useState} from "react";
import {ANSWERS, MAX_size} from "./Const";

function App() {
    const [fileList, setFileList] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files

        const arrFileList = [...file].map(currentFile => {
                console.log(currentFile)
                if (currentFile.size > MAX_size) {
                    return {
                        file: currentFile,
                        name: currentFile.name,
                        size: currentFile.size,
                        status: ANSWERS.bigSize
                    }
                }

                if (currentFile.name.length > 15) {
                    return {
                        file: currentFile,
                        name: currentFile.name,
                        size: currentFile.size,
                        status: ANSWERS.bigName
                    }
                }

                return {
                    file: currentFile,
                    name: currentFile.name,
                    size: currentFile.size,
                    status: ANSWERS.success
                }
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

