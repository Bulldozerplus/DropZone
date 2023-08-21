import './App.css';
import {useState} from "react";
import {countAllowedAndAbortedFiles} from "./FunctionCountAndSortFiles";


function App() {
    const [fileList, setFileList] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files

        const fileListSpreadArray = [...file]

        console.log(fileListSpreadArray)

        setFileList(prevState => [...prevState, ...countAllowedAndAbortedFiles(fileListSpreadArray, fileList)])
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

