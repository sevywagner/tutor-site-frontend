import { createContext, useState } from 'react';

const getRemainingTime = (time) => {
    const now = new Date().getTime();
    return time - now;
}

export const authContext = createContext({
    token: '',
    isLoggedIn: false,
    login: () => {},
    logout: () => {},
    getTokenValidity: () => {}
});

const AuthContextProvider = ({ children }) => {
    const getTokenValidity = () => {
        if (getRemainingTime(localStorage.getItem('expiration')) < 3000) {
            return false;
        } else {
            return true;
        }
    }

    const initialToken = localStorage.getItem('token') && getTokenValidity() ? localStorage.getItem('token') : null;
    const [token, setToken] = useState(initialToken);
    let isLoggedIn = token ? true : false;
    let logoutTimer;

    const login = (givenToken, givenExpiration) => {
        setToken(givenToken);
        localStorage.setItem('token', givenToken);
        localStorage.setItem('expiration', givenExpiration);

        logoutTimer = setTimeout(logout, getRemainingTime(localStorage.getItem('expiration')));
    }
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
        setToken(null);

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }

    const value = {
        token,
        isLoggedIn,
        login,
        logout,
        getTokenValidity
    }

    return (
        <authContext.Provider value={value}>
            {children}
        </authContext.Provider>
    );
}

export default AuthContextProvider;