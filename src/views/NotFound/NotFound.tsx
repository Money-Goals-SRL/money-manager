import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate("/", { replace: true });
    }
  }, [time, navigate]);
  return (
    <div>
      <h3 className={"redirect-page-title"}>
        The page you requested does not exist.
      </h3>
      <br />
      <p className={"redirect-page-text"}>
        You will return to the Home page in {time} seconds.{" "}
        <a href="/">Click HERE to return to home page</a>.
      </p>
    </div>
  );
}

export default NotFound;
