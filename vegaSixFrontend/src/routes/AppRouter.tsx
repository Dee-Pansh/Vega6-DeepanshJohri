import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard";
import AllPosts from "../pages/AllPosts";
import CreatePost from "../pages/CreatePost";
import UserPosts from "../pages/UserPosts";
import ViewPost from "../pages/ViewPost";

import {ROUTES} from "./RoutePaths";

const {HOME,LOGIN,SIGNUP,DASHBOARD,VIEW_POST,USER_POSTS,CREATE_POST,POSTS} = ROUTES;

const routes = createBrowserRouter([
    {
        path:HOME,
        element:<Home/>
    },
    {
        path:LOGIN,
        element:<Login/>
    },
    {
        path:SIGNUP,
        element:<Signup/>
    },
    {
        element:<PrivateRoute/>,
        children: [
            {
                path:DASHBOARD,
                element:<DashboardLayout/>,
                children:[
                    {
                        path:"",
                        element:<Dashboard/>
                    },
                    {
                        path:POSTS,
                        element:<AllPosts/>
                    },
                    {
                        path:CREATE_POST,
                        element:<CreatePost/>
                    },
                    {
                        path:USER_POSTS,
                        element:<UserPosts/>
                    },
                    {
                        path:VIEW_POST,
                        element:<ViewPost/>
                    }
                ]
            }
        ]
    }
])

const AppRouter = () => <RouterProvider router = {routes}/>
export default AppRouter;