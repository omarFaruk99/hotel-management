import {createBrowserRouter} from "react-router-dom";
import Home from "../Pages/Home";
import Layout from "../layout/Layout";
import NotFound from "../NotFound/NotFound";




export const router: any = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        errorElement: <NotFound/>,
        children: [
            {
                path: "/",
                element: <Home/>,
            },
        ],
    },
]);
