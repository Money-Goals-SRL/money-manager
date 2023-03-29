import React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Budget503020 from "./views/Budget503020/Budget503020";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import SavingToGoal from "./views/SavingToGoal/SavingToGoal";
import InternalRateReturn from "./views/InternalRateReturn/InternalRateReturn";
import NotFound from "./views/NotFound/NotFound";
import TermConditions from "./views/Documents/TermConditions";
import Privacy from "./views/Documents/Privacy";
import Disclaimer from "./views/Documents/Disclaimer";

// Per usare il client-side routing su GitHub, questa riga è necessaria perchè fornisce il basename di partenza del router.
const routerBaseName = process.env.PUBLIC_URL;

const router = createBrowserRouter(
  [
    { path: "/", element: <App body=<Home /> />, children: [] },
    { path: "profile", element: <App body=<Profile /> /> },
    { path: "budget-50-30-20", element: <App body=<Budget503020 /> /> },
    { path: "saving-to-goal", element: <App body=<SavingToGoal /> /> },
    { path: "irr", element: <App body=<InternalRateReturn /> /> },
    {
      path: "terms-and-conditions",
      element: <App body=<TermConditions /> />,
    },
    {
      path: "privacy",
      element: <App body=<Privacy /> />,
    },
    {
      path: "disclaimer",
      element: <App body=<Disclaimer /> />,
    },
    { path: "*", element: <App body=<NotFound /> /> },
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
