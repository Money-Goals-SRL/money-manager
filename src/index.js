import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Budget503020 from "./views/Budget503020/Budget503020";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";

// Per usare il client-side routing su GitHub, questa riga è necessaria perchè fornisce il basename di partenza del router.
const routerBaseName = process.env.PUBLIC_URL;

const router = createBrowserRouter(
  [
    { path: "/", element: <App body=<Home /> />, children: [] },
    { path: "profile", element: <App body=<Profile /> /> },
    { path: "budget-50-30-20", element: <App body=<Budget503020 /> /> },
    { path: "*", element: <App /> },
  ],
  { basename: routerBaseName }
);

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
