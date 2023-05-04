import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './css/header.module.css';
import { authContext } from "../../store/context/AuthContext";

const Header = () => {
    const authCtx = useContext(authContext);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    const logoutHandler = () => {
        authCtx.logout();
        navigate('/');
    }

    return (
        <header>
            <nav>
                <Link className={styles['nav-item']} to='/'>Home</Link>
                {!localStorage.getItem('token') && <Link className={styles['nav-item']} to='/sign-in'>Sign In</Link>}
                {!localStorage.getItem('token') && <Link className={styles['nav-item']} to='/sign-up'>Sign Up</Link>}
                {localStorage.getItem('token') && <Link className={styles['nav-item']} to='/notes'>Notes</Link>}
                {localStorage.getItem('token') && <button className={styles['nav-button']} onClick={logoutHandler}>Logout</button>}
            </nav>
        </header>
    );
}

export default Header;