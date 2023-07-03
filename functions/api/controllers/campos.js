/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"]*/

const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = () => {
  const controller = {};

  const stringUtil = app.utils.stringUtil;

  controller.cadastrar = async (req, res) => {
    await validarCadastro(req.body);

    try {
      const data = {
        descricao: req.body.descricao,
        grupo: req.body.grupo,
        tipo: req.body.tipo,
        formula: req.body.formula,
      };

      const response = [];

      const sistemasRef = db.collection("sistemas").doc(req.params.sistemaId);
      const FichaRef = sistemasRef.collection("fichas").doc(req.params.fichaId);
      const novoCampoRef = FichaRef.collection("campos");

      novoCampoRef.doc(req.body.id).set(data);

      if ("select" === req.body.tipo) {
        const res = FichaRef.collection(req.body.id);
        const valores = req.body.valores;

        let id = 1;
        for (const value of valores) {
          const newData = {valor: value};
          await res.doc(id.toString()).set(newData);
          id++;
        }
      }

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  cadastrarValoresSelect = async (FichaRef, body) => {
    try {
      const res = await FichaRef.add(body.id);

      const valores = body.valores;

      let id = 1;
      for (const valor of valores) {
        const val = await res.doc(id).set({nome: valor});
        id++;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao salvar campos de seleção");
    }
  };

  validarCadastro = async (body) => {
    if (stringUtil.isNullSafety(body.id)) {
      throw new Error("Erro ao salvar campo, necessário informar id");
    }

    if (stringUtil.isNullSafety(body.descricao)) {
      throw new Error("Erro ao salvar campo, necessário informar descrição");
    }

    if (stringUtil.isNullSafety(body.grupo)) {
      throw new Error("Erro ao salvar campo, necessário informar grupo");
    }

    if (stringUtil.isNullSafety(body.tipo)) {
      throw new Error("Erro ao salvar campo, necessário informar tipo");
    }

    if (!["number", "select", "text"].includes(body.tipo)) {
      throw new Error("Erro ao salvar campo, tipo do campo inválido!");
    }

    if ("select" === body.tipo) {
      if (body.valores == undefined || !Array.isArray(body.valores) || body.valores.length <= 1) {
        throw new Error("Erro ao salvar campo, valores de seleção não informados");
      }
    }

    return true;
  };

  return controller;
};
