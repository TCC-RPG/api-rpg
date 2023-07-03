// Importação firebase
const admin = require("firebase-admin");

// Chave de acesso ao banco
const serviceAccount = require("./resources/serviceAccountKey.json");

// Importação firebase
const functions = require("firebase-functions");
const cors = require("cors");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = require("./config/express")();
app.use(cors({origin: true}));

exports.app = functions.https.onRequest(app);
