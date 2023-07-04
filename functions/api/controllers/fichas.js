/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint linebreak-style: ["error", "windows"]*/
const admin = require("firebase-admin");
const db = admin.firestore();

module.exports = (app) => {
  const controller = {};
  const service = app.services.fichas;

  controller.cadastrar = async (req, res) => {
    try {
      const response = await service.cadastrar(req.params.id, req.body);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({"erro": error});
    }
  };

  controller.listar = async (req, res) => {
    try {
      const response = await service.listar(req.params.id);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({"erro": error});
    }
  };

  controller.buscar = async (req, res) => {
    try {
      const ficha = await service.buscar(req.params.sistema, req.params.ficha);
      return res.status(200).send(ficha);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  controller.calcular = async (req, res) => {
    try {
      const ficha = await service.calcular(req.params.sistema, req.params.ficha, req.body);
      return res.status(200).send(ficha);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  return controller;
};
