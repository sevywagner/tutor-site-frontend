import { useRef, useState } from "react";
import { useNavigate } from 'react-router';

import formStyles from './../globalCss/form.module.css';
import mainStyles from './../globalCss/main.module.css';
import styles from './css/sign-up.module.css';
import Button from "../components/util/Button";

const SignUp = () => {
    const [error, setError] = useState();

    const nameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();

        let error = false;
        try {
            const response = await fetch('https://tutor-site-rest-api.herokuapp.com/auth/signup', {
                method: 'PUT',
                body: JSON.stringify({
                    name: nameRef.current.value,
                    username: usernameRef.current.value,
                    email: emailRef.current.value,
                    password: passwordRef.current.value,
                    confirmPassword: confirmPasswordRef.current.value
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
                setError(data.error);
                console.log(data.error);
            } else {
                setError(null);
                navigate('/');
                console.log(data.message);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <p className={mainStyles.title}>Sign Up</p>
            {error && <p className={mainStyles.err}>Err! {error}</p>}
            <div className={styles['form-wrap']}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label>Name</label>
                    <input type="text" ref={nameRef} />
                    <label>Username</label>
                    <input type="text" ref={usernameRef} />
                    <label>Email</label>
                    <input type="text" ref={emailRef} />
                    <label>Password</label>
                    <input type="text" ref={passwordRef} />
                    <label>Confirm Password</label>
                    <input type="text" ref={confirmPasswordRef} />
                    <div className={mainStyles.wrap}>
                        <Button type="submit">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;