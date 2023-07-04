/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

// Importação firebase
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = (app) => {
  const service = {};
  const validacaoUtil = app.utils.validacaoUtil;

  service.cadastrar = async (sistema) => {
    if (validacaoUtil.stringIsNull(sistema.nome)) {
      throw new Error("Erro ao salvar sistema, necessário informar nome do Sistema");
    }

    const data = {
      nome: sistema.nome,
    };

    return await db.collection("sistemas").add(data);
  };

  service.listar = async () => {
    const response = [];
    const query = db.collection("sistemas");

    await query.get().then((querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        const selectedItem = {
          id: doc.id,
          nome: doc.data().nome,
        };
        response.push(selectedItem);
      }
    });

    return response;
  };

  return service;
};
