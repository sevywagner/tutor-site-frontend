import { useParams } from "react-router";
import { useState, useEffect } from "react";

const DownloadNote = () => {
    const [pdfBlob, setPdfBlob] = useState();
    const noteId = useParams();

    useEffect(() => {
        fetch('http://localhost:8080/notes/get-note-file', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((result) => {
            return result.json();
        }).then((blob) => {
            setPdfBlob(blob.webContentLink);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <div>
            <a href={pdfBlob}>Download</a>
        </div>
    );
}

export default DownloadNote;