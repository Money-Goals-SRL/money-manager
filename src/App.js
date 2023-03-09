import React from "react";
import Footer from "./views/Footer/Footer";
import Header from "./views/Header/Header";

function App(props) {
  return (
    <>
      <Header />
      <div className="page-body">{props.body}</div>
      <Footer />
    </>
  );
}

export default App;
