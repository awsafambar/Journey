// Your router file (probably src/router.tsx or src/routes.tsx)
import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";

import App from "../App";
import { About } from "../features/about/About";
import { Learn } from "../features/learn/Learn";
import { LearningWithMe } from "../features/learning-with-me/LearningWithMe";
import { Vlogs } from "../features/vlogs/Vlogs";
import RootLayout from "../layouts/RootLayout"; // ← import the new layout
import { JSConcepts } from "../features/learn/JSConcept/JSConcepts";
import { Problems } from "../features/learn/ProblemsAndConcepts/Problems";
import { New } from "../features/learn/New";

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
        path: "/about",
        element: <About />,
      },
      {
        path: "/frontend-labs",
        element: <Learn />,
      },
      {
        path: "/learn",
        element: <Navigate to="/frontend-labs" replace />,
      },
      {
        path: "/learning-with-me",
        element: <LearningWithMe />,
      },
      {
        path: "/vlogs",
        element: <Vlogs />,
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
        path: "learn/new",      // Learn page
        element: <New />,
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
