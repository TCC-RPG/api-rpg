/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"]*/

// Importação firebase
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = () => {
  const controller = {};

  controller.cadastrar = async (req, res) => {
    try {
      const data = {
        nome: req.body.nome,
      };

      const response = await db.collection("sistemas").add(data);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  controller.listar = async (req, res) => {
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
