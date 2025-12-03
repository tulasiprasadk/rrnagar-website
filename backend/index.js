const express = require("express");
const app = express();
const port = 5000;

app.get("/api/hello", (req, res) => {
  const message = { msg: "Hello from backend!" };
  console.log("Backend hit");
  res.json(message);
});

app.listen(port, () => {
  console.log("Backend running at http://localhost:" + port);
});
