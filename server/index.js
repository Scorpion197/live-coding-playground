require("dotenv").config({ path: ".env" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const pusher = require("pusher");

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use((req, rest, next) => {
  rest.header("Access-Control-Allow-Origin", "*");
  next();
});

app.post("/update-editor", (req, res) => {
  pusher.trigger("editor", "code-update", {
    ...req.body,
  });

  res.status(200).send("OK");
});
app.set("port", process.env.PORT || 5000);
const server = app.listen(() => {
  console.log(`Express running on: ${app.get("port")}`);
});
