/* eslint linebreak-style: ["error", "windows"]*/

module.exports = (app) => {
  const controller = {};
  const service = app.services.sistemas;

  controller.cadastrar = async (req, res) => {
    try {
      const response = service.cadastrar(req.body);
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  controller.listar = async (req, res) => {
    try {
      const response = await service.listar();
      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  };

  return controller;
};
