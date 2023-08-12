import './App.css';
import {useState} from "react";
import {ANSWERS, MAX_size} from "./Const";

function App() {
    const [fileList, setFileList] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files
        const sizeFile = e.dataTransfer.files[0].size
        const nameFile = e.dataTransfer.files[0].name
        const typeFile = nameFile.split('.').at(-1)
        console.log([...file])

        if (file && file.length <= 1) {
            if (file.size > MAX_size) {
                return setFileList(prevState => [...prevState, {
                    file: file,
                    name: nameFile,
                    size: sizeFile,
                    status: ANSWERS.bigSize
                }])
            }

            if (nameFile.length > 15) {
                return setFileList(prevState => [...prevState, {
                    file: file,
                    name: nameFile,
                    size: sizeFile,
                    status: ANSWERS.bigName
                }])
            }

            if (typeFile !== '.docx') {
                return setFileList(prevState => [...prevState, {
                    file: file,
                    name: nameFile,
                    size: sizeFile,
                    status: ANSWERS.wrongType
                }])
            }

            else if(file && file.length > 1) {
                const arrFileList = [...file]
                arrFileList.map(currentFile => {
                    if (currentFile.size > MAX_size) {
                        return setFileList(prevState => [...prevState, {
                            file: file,
                            name: nameFile,
                            size: sizeFile,
                            status: ANSWERS.bigSize
                        }])
                        if (currentFile.name.length > 15) {
                            return setFileList(prevState => [...prevState, {
                                file: file,
                                name: nameFile,
                                size: sizeFile,
                                status: ANSWERS.bigName
                            }])
                            if (typeFile !== 'docx') {
                                return setFileList(prevState => [...prevState, {
                                    file: file,
                                    name: nameFile,
                                    size: sizeFile,
                                    status: ANSWERS.wrongType
                                }])
                            }
                        }
                    }
                })
                console.log(arrFileList)
            }
                return setFileList(prevState => [...prevState, {
                    file: file,
                    name: nameFile,
                    size: sizeFile,
                    status: ANSWERS.success
                }])

            }


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
