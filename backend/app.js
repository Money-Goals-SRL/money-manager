const express = require("express");

app = express();

app.use(express.static("../frontend/public"));

app.get("/", (req, res) => {});
const port = 8084;
app.listen(port, console.log("server started on port " + port));
