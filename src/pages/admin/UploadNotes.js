import { useState } from 'react';
import Button from '../../components/util/Button';
import { useLoaderData } from 'react-router';
import mainStyles from './../../globalCss/main.module.css';
import styles from './css/upload-notes.module.css';

const UploadNotes = () => {
    const [file, setFile] = useState();
    const [userId, setUserId] = useState();
    const [response, setResponse] = useState();
    const [error, setError] = useState();
    const userList = useLoaderData();

    const sendRequest = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('userId', userId);
        formData.append('mimeType', 'pdf');

        let error = false;
        fetch('https://tutor-site-rest-api.herokuapp.com/notes/upload', {
            method: 'PUT',
            body: formData,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }).then((response) => {
            if (!response.ok) {
                error = true;
            }

            return response.json();
        }).then((data) => {
            if (error) {
                console.log(data.error);
                setError(data.error);
            } else {
                console.log(data.message);
                setResponse(data.message);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    const fileHandler = (event) => {
        setFile(event.target.files[0]);
    }

    const selectChangeHandler = (event) => {
        setUserId(event.target.value);
        console.log(event.target.value)
    }

    return (
        <div>
            <h1>Upload Notes</h1>
            {error && <p className={mainStyles.err}>{error}</p>}
            {response && <p>{response}</p>}
            <div className={mainStyles['centered-column']}>
                <form className={styles.form} onSubmit={sendRequest}>
                    <input type="file" onChange={fileHandler.bind(this)} />
                    <div className={mainStyles.wrap}>
                        <select onChange={selectChangeHandler}>
                            {userList.map((user) => <option value={user._id} key={user._id}>{user.name}</option>)}
                        </select>
                    </div>
                    <div className={mainStyles.wrap}>
                        <Button type='submit'>Upload</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export const loader = async () => {
    const response = await fetch('https://tutor-site-rest-api.herokuapp.com/admin/get-users', {
        method: 'GET'
    });
    const data = await response.json();
    return data.userList;
}

export default UploadNotes;