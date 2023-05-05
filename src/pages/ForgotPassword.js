import { useRef } from 'react'
import Button from '../components/util/Button';

const ForgotPassword = () => {
    const emailRef = useRef();

    const submitHandler = async (e) => {
        e.preventDefault();

        let error = false;
        try {
            const response = await fetch('https://sevywagner.github.io/tutor-site-frontend/auth/request-reset-link', {
                method: 'POST',
                body: JSON.stringify({ email: emailRef.current.value }),
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
                console.log(data);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <label>Email</label>
                <input type="text" ref={emailRef} />
                <Button type="submit">Send Reset Link</Button>
            </form>
        </div>
    );
}

export default ForgotPassword;