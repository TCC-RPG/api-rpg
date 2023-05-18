/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"]*/

// Importação firebase
const admin = require("firebase-admin");

// Chave de acesso ao banco
const serviceAccount = require("../../resources/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = () => {
  const controller = {};

  controller.listarSistemas = async (req, res) => {
    try {
      const query = db.collection("sistemas");
      const response = [];
      await query.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().name,
          };
          response.push(selectedItem);
        }
      });
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  return controller;
};
