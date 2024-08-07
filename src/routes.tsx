import React from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";

import App from "./App";
import Budget503020 from "./views/Budget503020/Budget503020";
import Home from "./views/Home/Home";
import Profile from "./views/Profile/Profile";
import SavingToGoal from "./views/SavingToGoal/SavingToGoal";
// import InternalRateReturn from "./views/InternalRateReturn/InternalRateReturn";
import NotFound from "./views/NotFound/NotFound";
import CompoundInterest from "./views/CompoundInterest/CompoundInterest";
import Mortgage from "./views/Mortgage/Mortgage";
import NetSalary from "./views/NetSalary/NetSalary";
import Rental from "./views/Rental/Rental";

import TermConditions from "./views/Documents/TermConditions";
import Privacy from "./views/Documents/Privacy";
import Disclaimer from "./views/Documents/Disclaimer";
import ConversionLength from "./views/Conversion/Length/Conversion";

// Per usare il client-side routing su GitHub, questa riga è necessaria perchè fornisce il basename di partenza del router.
// const routerBaseName = process.env.PUBLIC_URL;

const routes: RouteObject[] = [
	{ path: "/", element: <App body={<Home />} />, index: true },
	{ path: "profile", element: <App body={<Profile />} /> },
	{ path: "budget-50-30-20", element: <App body={<Budget503020 />} /> },
	{ path: "saving-to-goal", element: <App body={<SavingToGoal />} /> },
	// { path: "irr", element: <App body={<InternalRateReturn />} /> },
	{ path: "compound-interest", element: <App body={<CompoundInterest />} /> },
	{ path: "mortgage", element: <App body={<Mortgage />} /> },
	{ path: "net-salary", element: <App body={<NetSalary />} /> },
	{
		path: "rental",
		element: <App body={<Rental />} />,
	},
	{
		path: "conversion/length",
		element: <App body={<ConversionLength />} />,
	},
	{
		path: "terms-and-conditions",
		element: <App body={<TermConditions />} />,
	},
	{
		path: "privacy",
		element: <App body={<Privacy />} />,
	},
	{
		path: "disclaimer",
		element: <App body={<Disclaimer />} />,
	},
	{ path: "*", element: <App body={<NotFound />} /> },
];
const router = createBrowserRouter(routes, { basename: "/" });

export default router;
