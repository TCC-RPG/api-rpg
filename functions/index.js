// Importação firebase
const functions = require("firebase-functions");
const cors = require("cors");

const app = require("./config/express")();
app.use(cors({origin: true}));

exports.app = functions.https.onRequest(app);
