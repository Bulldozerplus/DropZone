import './App.css';
import {useState} from "react";
import {ANSWERS, MAX_size} from "./Const";

function App() {
    const [files, setFiles] = useState([])


    function handleDrop(e) {
        const file = e.dataTransfer.files
        const sizeFile = e.dataTransfer.files[0].size
        const nameFile = e.dataTransfer.files[0].name
        const spreadFile = [...file]

        const typeFile = nameFile.split('.').at(-1)

        if (file) {
            spreadFile.map(file => {
                console.log(spreadFile)
                if (file.size > MAX_size) {
                    return setFiles(prevState => [...prevState, {
                        file: file,
                        name: nameFile,
                        size: sizeFile,
                        status: ANSWERS.bigSize
                    }])
                }
                if (nameFile.length > 15) {
                    return setFiles(prevState => [...prevState, {
                        file: file,
                        name: nameFile,
                        size: sizeFile,
                        status: ANSWERS.bigName
                    }])
                }

                if (typeFile !== '.docx' || '.txt') {
                    return setFiles(prevState => [...prevState, {
                        file: file,
                        name: nameFile,
                        size: sizeFile,
                        status: ANSWERS.wrongType
                    }])
                }
                return setFiles(prevState => [...prevState, {
                    file: file,
                    name: nameFile,
                    size: sizeFile,
                    status: ANSWERS.success
                }])

            })
            console.log(file)
        }


        // if (file) {
        //     if (!nameFile.includes('.docx')) {
        //         return setFiles(prevState => [...prevState, {
        //             file: file,
        //             name: nameFile,
        //             size: sizeFile,
        //             status: ANSWERS.wrongType
        //         }])
        //     } if (nameFile.length > 15) {
        //        return setFiles(prevState => [...prevState, {
        //             file: file,
        //             name: nameFile,
        //             size: sizeFile,
        //             status: ANSWERS.bigName
        //         }])
        //     } if (sizeFile > MAX_size) {
        //         return setFiles(prevState => [...prevState, {
        //             file: file,
        //             name: nameFile,
        //             size: sizeFile,
        //             status: ANSWERS.bigSize
        //         }])
        //     }
        //         return setFiles(prevState => [...prevState, {
        //             file: file,
        //             name: nameFile,
        //             size: sizeFile,
        //             status: ANSWERS.success
        //         }])
        // }

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
            <div>{files.length === 0
                ? <h1>Files not fined</h1>
                : files.map((file, index) => (
                    <div>{index + 1}. <strong>{file.name}</strong>, {file.size} - {file.status}</div>
                ))}
            </div>
        </div>
    );
}


export default App;
