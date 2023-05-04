import { RouterProvider } from "react-router";
import router from "./components/Routing";
import { useEffect, useContext } from "react";
import { authContext } from "./store/context/AuthContext";

function App() {
  const authCtx = useContext(authContext);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const tokenValidity = authCtx.getTokenValidity();
      if (!tokenValidity) {
        authCtx.logout();
      }
    }
  }, [authCtx.isLoggedIn]);

  return <RouterProvider router={router} />;
}

export default App;