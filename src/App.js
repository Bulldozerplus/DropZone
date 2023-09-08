import './App.css';
import {useEffect, useState} from "react";
import {countAllowedAndAbortedFiles} from "./Function/FunctionCountAndSortFiles";
import {pushDataOnTheServer} from "./Function/PushDataOnServer";
import {serverFetch} from "./Servises/URlservices";
import LIstFilesOnTheServer from "./Componetns/LIstFilesOnTheServer";
import {uploadFileFromServer} from "./Function/UploadFile";


function App() {
    const [fileListPrepareForDownload, setFileListPrepareForDownload] = useState([])
    const [fileListFromServer, setFileListFromServer] = useState([])
    const [fileListLoading, setFileListLoading] = useState(false)

    useEffect(() => {
        getDataForRender()
    }, [])

    async function getDataForRender() {
        setFileListLoading(true)
        const dataFromServer = await serverFetch.getFiles()
        setFileListFromServer(dataFromServer.data)
        setFileListLoading(false)
    }

    async function deleteFileOnServer(id) {
        await serverFetch.deleteFiles(id)
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
                ? <h1>Files not founded</h1>
                : fileListPrepareForDownload.map((file, index) => (
                    <div key={index}>{index + 1}. <strong>{file.name}</strong>, {file.size} - {file.status}</div>
                ))}
            </div>
            <h2>Files on the server</h2>
            {fileListLoading
                ? <h2>Searching files...</h2>
                : <LIstFilesOnTheServer
                    deleteFileOnServer={deleteFileOnServer}
                    fileListFromServer={fileListFromServer}
                    uploadFileFromServer={uploadFileFromServer}
                />
            }

        </div>
    );
}


export default App;

