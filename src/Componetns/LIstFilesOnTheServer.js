import React from 'react';
import {uploadFileFromServer} from "../Function/UploadFile";

const LIstFilesOnTheServer = ({fileListFromServer, deleteFileOnServer}) => {
    return (
        <div>{fileListFromServer.length === 0
            ? <h1>Files not founded</h1>
            : fileListFromServer.map((file, index) => (
                <div key={index}>{index + 1}<strong>{file.filename}</strong>, {file.size}
                    <button className='button_delete' onClick={() => deleteFileOnServer(file.id)}>delete file</button>
                    <button className='button_download' onClick={() => uploadFileFromServer(file.id, file.filename)}>download file</button>
                </div>
            ))}
        </div>
    );
};

export default LIstFilesOnTheServer;