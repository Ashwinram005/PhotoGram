import { createBrowserRouter } from "react-router-dom";
import Error from "./pages/error";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Home from "./pages/home";
import CreatePost from "./pages/post";
import Profile from "./pages/profile";
import MyPhotos from "./pages/myphotos";

export const router=createBrowserRouter ([
    {
        path: "/home",
        element:<Home/>,
        errorElement:<Error/>,
    },
    {
        path: "/post",
        element:<CreatePost/>,
        errorElement:<Error/>,
    },
    {
        path: "/profil",
        element:<Profile/>,
        errorElement:<Error/>,
    },
    {
        path: "/myphotos",
        element:<MyPhotos/>,
        errorElement:<Error/>,
    },
    {
        path: "/login",
        element:<Login/>,
        errorElement:<Error/>,
    },
    {
        path: "/signup",
        element:<Signup/>,
        errorElement:<Error/>,
    },
]);

export default router;