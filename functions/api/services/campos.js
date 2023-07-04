/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

// Importação firebase
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = (app) => {
  const service = {};
  const validacaoUtil = app.utils.validacaoUtil;

  service.cadastrar = async (header, campo) => {
    const data = {
      descricao: campo.descricao,
      grupo: campo.grupo,
      tipo: campo.tipo,
      formula: campo.formula,
    };

    try {
      if (service._validarValores(campo)) {
        const sistemasRef = db.collection("sistemas").doc(header.sistemaId);
        const FichaRef = sistemasRef.collection("fichas").doc(header.fichaId);
        const novoCampoRef = FichaRef.collection("campos");

        novoCampoRef.doc(campo.id).set(data);

        if ("select" === campo.tipo) {
          const res = FichaRef.collection(campo.id);
          const valores = campo.valores;

          let id = 1;
          for (const value of valores) {
            const newData = {valor: value};
            await res.doc(id.toString()).set(newData);
            id++;
          }
        }
      }
    } catch (error) {
      console.log(error);
      throw new Error("Erro ao tentar cadastrar campos");
    }
  };

  service._validarValores = (campo) => {
    if (validacaoUtil.stringIsNull(campo.id)) {
      throw new Error("Erro ao salvar campo, necessário informar id");
    }

    if (validacaoUtil.stringIsNull(campo.descricao)) {
      throw new Error("Erro ao salvar campo, necessário informar descrição");
    }

    if (validacaoUtil.stringIsNull(campo.grupo)) {
      throw new Error("Erro ao salvar campo, necessário informar grupo");
    }

    if (validacaoUtil.stringIsNull(campo.tipo)) {
      throw new Error("Erro ao salvar campo, necessário informar tipo");
    }

    if (!["number", "select", "text"].includes(campo.tipo)) {
      throw new Error("Erro ao salvar campo, tipo do campo inválido!");
    }

    if ("select" === campo.tipo) {
      if (campo.valores == undefined || !Array.isArray(campo.valores) || campo.valores.length <= 1) {
        throw new Error("Erro ao salvar campo, valores de seleção não informados");
      }
    }

    return true;
  };

  return service;
};
