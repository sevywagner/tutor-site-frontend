import { Outlet } from "react-router";
import Header from "./Header";

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <Outlet />
            {children && children}
        </>
    );
}

export default Layout;