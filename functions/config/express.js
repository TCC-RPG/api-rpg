/* eslint linebreak-style: ["error", "windows"]*/

const express = require("express");
const bodyParser = require("body-parser");
const consign = require("consign");
const cors = require("cors");

module.exports = () => {
  const app = express();
  app.use(cors({origin: true}));

  // MIDDLEWARES
  app.use(bodyParser.json());

  consign({cwd: "api"})
      .then("utils")
      .then("services")
      .then("controllers")
      .then("routes")
      .into(app);

  return app;
};
