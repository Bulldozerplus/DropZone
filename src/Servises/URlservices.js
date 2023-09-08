import axios from "axios";

export const serverFetch = {
    getFiles: () => axios.get('http://localhost:4003/files/list'),
    pushFiles: (formData) => fetch('http://localhost:4003/files/save', {
            method: 'POST',
            body: formData
        }
    ),
    deleteFiles: (id) => fetch(`http://localhost:4003/files/delete/${id}`),
    uploadFiles: (id) => fetch(`http://localhost:4003/files/download/${id}`)
}