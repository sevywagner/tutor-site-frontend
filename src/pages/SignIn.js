import { useRef, useContext, useState } from "react";
import { authContext } from "../store/context/AuthContext";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import formStyles from './../globalCss/form.module.css';
import mainStyles from './../globalCss/main.module.css';
import styles from './css/sign-up.module.css';
import Button from "../components/util/Button";

const SignIn = () => {
    const navigate = useNavigate();

    const [error, setError] = useState();

    const usernameRef = useRef();
    const passwordRef = useRef();

    const authCtx = useContext(authContext);

    const submitHandler = async (e) => {
        e.preventDefault();

        let error = false;
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                body: JSON.stringify({
                    username: usernameRef.current.value,
                    password: passwordRef.current.value
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
                setError(data.error);
            } else {
                console.log(data);
                authCtx.login(data.token, data.expiration);
                navigate('/');
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <p className={mainStyles.title}>Sign In</p>
            {error && <p>{error}</p>}
            <div className={styles['form-wrap']}>
                <form className={styles.form} onSubmit={submitHandler}>
                    <label>Username</label>
                    <input type="text" ref={usernameRef} />
                    <label>Password</label>
                    <input type="password" ref={passwordRef} />
                    <div className={mainStyles.wrap}>
                        <Button type="submit">Login</Button>
                    </div>
                    <Link to='/reset-password'>Reset Password</Link>
                </form>
            </div>
        </div>
    );
}

export default SignIn;