// const express = require("express");

// app = express();

// app.use(express.static("../frontend/public"));

// app.get("/", (req, res) => {});
// const port = 8084;
// app.listen(port, console.log("server started on port " + port));

const express = require("express");
const path = require("path");
const app = express();

// Serve the built React app from the "docs" directory
app.use(express.static(path.join(__dirname, "docs")));

// Handle API requests here
app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

// For any other routes, return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "docs", "index.html"));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
