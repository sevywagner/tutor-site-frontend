import { createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import UploadNotes from "../pages/admin/UploadNotes";
import Notes, { loader } from "../pages/Notes";
import DownloadNote from "../pages/DownloadNote";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'sign-up',
                element: <SignUp />
            },
            {
                path: 'sign-in',
                element: <SignIn />
            },
            {
                path: 'reset-password',
                element: <ForgotPassword />
            },
            {
                path: 'reset-password/:resetToken',
                element: <ResetPassword />
            },
            {
                path: 'upload-notes',
                element: <UploadNotes />,
                loader: () => import('./../pages/admin/UploadNotes').then((module) => module.loader())
            },
            {
                path: 'notes',
                element: <Notes />,
                loader: () => import('./../pages/Notes').then((module) => module.loader())
            },
            {
                path: 'note/:noteId',
                element: <DownloadNote />
            }
        ]
    }
]);

export default router;