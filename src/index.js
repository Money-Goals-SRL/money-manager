import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Budget503020 from "./views/Budget503020/Budget503020";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";

const router = createBrowserRouter([
  { path: "/", element: <App body=<Home /> />, children: [] },
  { path: "/profile", element: <App body=<Profile /> /> },
  { path: "/budget-50-30-20", element: <App body=<Budget503020 /> /> },
  { path: "*", element: <App /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
