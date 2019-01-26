const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const characters = require("./routes/api/characters");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Use Routes
app.use("/api/characters", characters);

if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
