import { useState } from "react";
import { useLoaderData } from "react-router";
import styles from './css/notes.module.css';
import mainStyles from './../globalCss/main.module.css';
import DownloadModal from "../components/notes/DownloadModal";

const Notes = () => {
    const [contentLink, setContentLink] = useState();
    const [fileName, setFileName] = useState();
    const notesList = useLoaderData().notesList;

    const submitHandler = ([noteId, fileName]) => {
        console.log(noteId);
        fetch('http://localhost:8080/notes/get-note-file', {
            method: 'POST',
            body: JSON.stringify({ noteId }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((result) => {
            return result.json();
        }).then((data) => {
            setContentLink(data.webContentLink);
            setFileName(fileName);
        }).catch((err) => {
            console.log(err);
        });
    }

    const dismissHandler = () => {
        setContentLink(null);
    }

    return (
        <div>
            <p className={mainStyles.title}>Notes</p>
            <div className={styles['note-list']}>
                {notesList.map((note) => <button className={styles['note-item']} key={note._id} onClick={submitHandler.bind(null, [note.driveId, note.filename])}>{note.filename.split('.')[0]}</button>)}
            </div>
            {contentLink && <DownloadModal fileName={fileName} webContentLink={contentLink} onDismiss={dismissHandler} />}
        </div>
    );
}

export const loader = async () => {
    try {
        const response = await fetch('http://localhost:8080/notes/get-users-notes', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        return data;
    } catch (err) {
        console.log(err);
    }
}

export default Notes;