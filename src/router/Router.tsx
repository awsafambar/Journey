// Your router file (probably src/router.tsx or src/routes.tsx)
import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import { Learn } from "../features/learn/Learn";
import RootLayout from "../layouts/RootLayout"; // ← import the new layout
import { JSConcepts } from "../features/learn/JSConcept/JSConcepts";
import { Problems } from "../features/learn/ProblemsAndConcepts/Problems";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // ← this wraps all pages with Header
    children: [
      {
        path: "/",           // Home page
        element: <App />,
      },
      {
        path: "/learn",      // Learn page
        element: <Learn />,
      },
      {
        path: "learn/jsconcept",      // Learn page
        element: <JSConcepts />,
      },
      {
        path: "learn/problemsConcept",      // Learn page
        element: <Problems />,
      },
      {
        path: "*",           // 404 for any unmatched route
        element: <div className="flex items-center justify-center min-h-[60vh] text-2xl font-bold text-gray-600">
          404 – Page Not Found!
        </div>,
      },
    ],
  },
]);

export default router;