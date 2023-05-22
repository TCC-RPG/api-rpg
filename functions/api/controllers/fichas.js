/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"]*/
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = () => {
  const controller = {};

  controller.listar = async (req, res) => {
    const response = [];

    try {
      const sistemasRef = db.collection("sistemas").doc(req.params.id);
      const fichasRef = sistemasRef.collection("fichas");

      await fichasRef.get().then((querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          const selectedItem = {
            id: doc.id,
            name: doc.data().nome,
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

  controller.buscar = async (req, res) => {
    const ficha = {};

    try {
      const sistemasRef = db.collection("sistemas").doc(req.params.sistema);
      const fichasRef = sistemasRef.collection("fichas").doc(req.params.ficha);

      const fichaDoc = await fichasRef.get();

      ficha.id = fichaDoc.id;
      ficha.nome = fichaDoc.data().nome;

      const camposRef = fichasRef.collection("campos");

      await camposRef.get().then(async (querySnapshot) => {
        const docs = querySnapshot.docs;
        for (const doc of docs) {
          if (ficha[doc.data().grupo] === undefined) {
            ficha[doc.data().grupo] = [];
          }

          const campo = {
            "id": doc.id,
            "nome": doc.data().descricao,
            "tipo": doc.data().tipo,
            "isFormula": doc.data().formula !== "",
            "isSelect": doc.data().tipo === "select",
          };

          if (campo.isSelect) {
            const opcoesRef = fichasRef.collection(campo.id);
            const opcoesResponse = [];

            await opcoesRef.get().then((opQuerySnapshot) => {
              const opcoes = opQuerySnapshot.docs;
              for (const opc of opcoes) {
                opcoesResponse.push(opc.data().descricao);
              }
            });

            campo.opcoes = opcoesResponse;
          }

          ficha[doc.data().grupo].push(campo);
        }
      });

      return res.status(200).send(ficha);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  return controller;
};
