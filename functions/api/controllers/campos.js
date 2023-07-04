/* eslint linebreak-style: ["error", "windows"]*/

module.exports = (app) => {
  const controller = {};
  const service = app.services.campos;

  controller.cadastrar = async (req, res) => {
    const response = [];
    try {
      service.cadastrar({
        sistemaId: req.params.sistemaId,
        fichaId: req.params.fichaId,
      }, req.body);

      return res.status(200).send(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send({"erro": error});
    }
  };

  return controller;
};
