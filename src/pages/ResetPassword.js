import { useRef } from 'react';
import { useParams } from 'react-router';

import formStyles from './../globalCss/form.module.css';
import mainStyles from './../globalCss/main.module.css';
import Button from "../components/util/Button";

const ResetPassword = () => {
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const token = useParams().resetToken;

    const submitHandler = async (event) => {
        event.preventDefault();

        let error = false;
        const response = await fetch('https://sevywagner.github.io/tutor-site-frontend/auth/reset-password', {
            method: 'POST',
            body: JSON.stringify({
                password: passwordRef.current.value,
                confirmPassword: confirmPasswordRef.current.value,
                resetToken: token
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            error = true;
        }

        const data = await response.json();

        if (error) {
            console.log(data.error);
        } else {
            console.log(data.message);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>New Password</label>
                <input type='password' ref={passwordRef} />
                <label>Confirm Password</label>
                <input type='password' ref={confirmPasswordRef} />
                <Button type='submit'>Reset</Button>
            </form>
        </div>
    );
}

export default ResetPassword;