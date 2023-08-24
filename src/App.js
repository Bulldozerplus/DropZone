import './App.css';
import {useState} from "react";
import {countAllowedAndAbortedFiles} from "./FunctionCountAndSortFiles";



function App() {
    const [fileListPrepareForDownload, setFileListPrepareForDownload] = useState([])


     function pushDataOnTheServer(filesArray) {
            return filesArray.map(async (currentFile) => {
            const formData = new FormData()
            formData.append('file', currentFile)
            return await fetch('http://localhost:4003/files/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: formData
            })
        })
    }


    function handleDrop(e) {
        const file = e.dataTransfer.files

        const fileListSpreadArray = [...file]

        console.log(fileListSpreadArray)

        setFileListPrepareForDownload(prevState => [...prevState, ...countAllowedAndAbortedFiles(fileListSpreadArray, fileListPrepareForDownload)])
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
            <h2>Files prepare for download</h2>
            <div>{fileListPrepareForDownload.length === 0
                ? <h1>Files not fined</h1>
                : fileListPrepareForDownload.map((file, index) => (
                    <div>{index + 1}. <strong>{file.name}</strong>, {file.size} - {file.status}</div>
                ))}
            </div>
            <button onClick={() => pushDataOnTheServer(fileListPrepareForDownload)}>Download files on the server</button>
        </div>
    );
}


export default App;

