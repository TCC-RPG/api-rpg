/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

// Importação firebase
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = (app) => {
  const service = {};
  const validacaoUtil = app.utils.validacaoUtil;
  const formulaCalculator = app.utils.calculoUtil;

  service.cadastrar = async (sistemaId, ficha) => {
    if (validacaoUtil.stringIsNull(ficha.nome)) {
      throw new Error("Erro ao salvar ficha, necessário informar nome do Sistema");
    }

    const data = {
      nome: ficha.nome,
    };

    const sistemasRef = db.collection("sistemas").doc(sistemaId);
    const novaFichaRef = sistemasRef.collection("fichas");

    return await novaFichaRef.add(data);
  };

  service.listar = async (sistemaId) => {
    const response = [];

    const sistemasRef = db.collection("sistemas").doc(sistemaId);
    const fichasRef = sistemasRef.collection("fichas");

    await fichasRef.get().then((querySnapshot) => {
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

  service.buscar = async (sistemaId, fichaId) => {
    const sistemasRef = db.collection("sistemas").doc(sistemaId);
    const fichasRef = sistemasRef.collection("fichas").doc(fichaId);
    const fichaDoc = await fichasRef.get();

    const camposRef = fichasRef.collection("campos");

    const ficha = {};
    ficha.id = fichaDoc.id;
    ficha.nome = fichaDoc.data().nome;

    await camposRef.get().then(async (querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        if (ficha[doc.data().grupo] === undefined) {
          ficha[doc.data().grupo] = [];
        }

        const campo = service._montarDadosCampo(doc);

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

    return ficha;
  };

  service.calcular = async (sistemaId, fichaId, campos) => {
    const sistemasRef = db.collection("sistemas").doc(sistemaId);
    const fichasRef = sistemasRef.collection("fichas").doc(fichaId);
    const camposRef = fichasRef.collection("campos");

    const fichaDoc = await fichasRef.get();

    const ficha = {};
    ficha.id = fichaDoc.id;
    ficha.nome = fichaDoc.data().nome;

    const mapaCampos = new Map(Object.entries(campos));

    await camposRef.get().then(async (querySnapshot) => {
      const docs = querySnapshot.docs;
      for (const doc of docs) {
        if (ficha[doc.data().grupo] === undefined) {
          ficha[doc.data().grupo] = [];
        }

        const valor = formulaCalculator.start(mapaCampos, doc);

        const campo = {
          "id": doc.id,
          "nome": doc.data().descricao,
          "valor": valor,
        };

        ficha[doc.data().grupo].push(campo);
      }
    });

    return ficha;
  };

  service._montarDadosCampo = (doc) => {
    return {
      "id": doc.id,
      "nome": doc.data().descricao,
      "tipo": doc.data().tipo,
      "isFormula": doc.data().formula !== "",
      "isSelect": doc.data().tipo === "select",
    };
  };

  return service;
};
