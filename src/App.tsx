import React from "react";
import Footer from "./views/Footer/Footer";
import Header from "./views/Header/Header";

function App({ body }: { body: JSX.Element }) {
	return (
		<>
			<Header />
			<div className="page-body">{body}</div>
			<Footer />
		</>
	);
}

export default App;
