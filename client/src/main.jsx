import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import Week1Page from "./pages/week1.jsx";
import HomePage from "./pages/Home.jsx";
import BahayaPage from "./pages/Bahaya.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: "Login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/homepage",
    element: <HomePage />,
  },
  {
    path: "/week-1",
    element: <Week1Page />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/bahaya",
    element: <BahayaPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
