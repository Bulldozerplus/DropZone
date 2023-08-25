import './App.css';
import {useEffect, useState} from "react";
import {countAllowedAndAbortedFiles} from "./Function/FunctionCountAndSortFiles";
import axios from "axios";
import {pushDataOnTheServer} from "./Function/PushDataOnServer";



function App() {
    const [fileListPrepareForDownload, setFileListPrepareForDownload] = useState([])
    const [fileListFromServer, setFileListFromServer] = useState([])

    async function getDataForRender() {
        const dataFromServer = await axios.get('http://localhost:4003/files/list')
        setFileListFromServer(dataFromServer.data)
        console.log(dataFromServer.data)
    }

    useEffect(() => {
        getDataForRender()
    },[fileListFromServer])



    function handleDrop(e) {
        const file = e.dataTransfer.files

        const fileListSpreadArray = [...file]

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
            <h2>Files prepare for download</h2>
            <div>{fileListFromServer.length === 0
                ? <h1>Files not fined</h1>
                : fileListFromServer.map((file, index) => (
                    <div>{index + 1}<strong>{file.filename}</strong>, {file.size}</div>
                ))}
            </div>
        </div>
    );
}


export default App;

