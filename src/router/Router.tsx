import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Learn } from "../components/learn/Learn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },{
        path: "/learn",
        element: <Learn />
    },
    {
        path: "*",
        element: <div>404 Not Found!</div>,
    }
])

export default router;