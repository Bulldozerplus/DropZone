import './App.css';
import {useState} from "react";

function App() {
    const [files, setFiles] = useState([])

    const [answerLoad, setAnswerLoad] = useState('')

    const ANSWERS = {
        success: 'load complete',
        bigName: 'To big name file',
        bigSize: 'To big size file',
        wrongType: 'Wrong type file'
    }

    function handleDrop(e) {
        console.log(e.dataTransfer.files[0])

        const sizeFile = e.dataTransfer.files[0].size
        const nameFile = e.dataTransfer.files[0].name

        const MAX_size = 5120


        if (nameFile) {
            if (!nameFile.includes('.docx', 'pdf', 'txt')) {
                setAnswerLoad(ANSWERS.wrongType)
            } else if (nameFile.length > 15) {
                setAnswerLoad(ANSWERS.bigName)
            }
        } else if (sizeFile && sizeFile > MAX_size) {
            setAnswerLoad(ANSWERS.bigSize)
        } else {
            setFiles(prevState => [...prevState, nameFile])
            setAnswerLoad(ANSWERS.success)
        }

        e.stopPropagation()
    }

    return (
        <div className="App">
            <div className="dropzone" id="droptarget">
                <input className='dropzone'
                       type='file'
                       value=""
                       maxSize='5000'
                       onDrop={handleDrop}/>Drop file here
            </div>
            <div>{files.length === 0
                ? <h1>Files not fined</h1>
                : files.map((file, index) => (
                    <div>{index + 1}. {file}</div>
                ))}
            </div>
            <div>{answerLoad}</div>
        </div>
    );
}


export default App;
