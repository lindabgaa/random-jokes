const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;

app.get("/api", (req, res) => {
  res.send("Hello from server !");
});

app
  .listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error starting server: ", err);
  });
