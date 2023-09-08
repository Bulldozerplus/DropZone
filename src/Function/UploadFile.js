import {serverFetch} from "../Servises/URlservices";

export  async function uploadFileFromServer(id, fileName) {
    const fetchUploadUrl = await serverFetch.uploadFiles(id)

    if (fetchUploadUrl.status === 204) {
        setTimeout(() => {
            uploadFileFromServer(id, fileName)
        }, 3000)
    }
    if (fetchUploadUrl.status === 200) {
        const blobFetchData = await fetchDownloadUrl.blob()
        let objectURl = URL.createObjectURL(blobFetchData)
        let anchor = document.createElement("a")
        anchor.download = `${fileName}`
        anchor.href = objectURl
        anchor.click()
    }

}