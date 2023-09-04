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
    }

    async function downloadFileFromServer(id, fileName) {
       const fetchDownloadUrl = await fetch(`http://localhost:4003/files/download/${id}`)

        console.log(fetchDownloadUrl)
        if (fetchDownloadUrl.status === 204) {
            console.log('if')
            setTimeout(() => {
               downloadFileFromServer(id, fileName)
            }, 3000)
        }
        if (fetchDownloadUrl.status === 200) {
            const blobFetchData = await fetchDownloadUrl.blob()
            let objectURl = URL.createObjectURL(blobFetchData)
            let anchor = document.createElement("a")
            anchor.download = `${fileName}`
            anchor.href = objectURl
            anchor.click()
        }

    }

    async function deleteFileOnServer(id) {
        await fetch(`http://localhost:4003/files/delete/${id}`)
        setFileListPrepareForDownload([])
        return getDataForRender()
    }

   async function pushDataAndRender() {
        await pushDataOnTheServer(fileListPrepareForDownload)
        return getDataForRender()
    }

    function handleDrop(e) {
        const file = e.dataTransfer.files

        const fileListSpreadArray = [...file]

        setFileListPrepareForDownload(prevState => [...prevState, ...countAllowedAndAbortedFiles(fileListSpreadArray, fileListPrepareForDownload)])

    }

    useEffect(() => {
        getDataForRender()
    }, [])


    return (
        <div className="App">
            <div className="dropzone" id="droptarget">
                <input className='dropzone'
                       type='file'
                       multiple
                       value=""
                       onDrop={handleDrop}
                       onChange={() => pushDataAndRender()}/>Drop file here
            </div>
            <h2>Files prepare for download</h2>
            <div>{fileListPrepareForDownload.length === 0
                ? <h1>Files not fined</h1>
                : fileListPrepareForDownload.map((file, index) => (
                    <div key={index}>{index + 1}. <strong>{file.name}</strong>, {file.size} - {file.status}</div>
                ))}
            </div>
            <h2>Files on the server</h2>
            <div>{fileListFromServer.length === 0
                ? <h1>Files not fined</h1>
                : fileListFromServer.map((file, index) => (
                    <div key={index}>{index + 1}<strong>{file.filename}</strong>, {file.size}
                        <button className='button_delete' onClick={() => deleteFileOnServer(file.id)}>delete file</button>
                        <button className='button_download' onClick={() => downloadFileFromServer(file.id, file.filename)}>download file</button>
                    </div>
                ))}
            </div>
        </div>
    );
}


export default App;

