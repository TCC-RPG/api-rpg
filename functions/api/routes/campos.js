/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.campos;

  app.route("/api/v1/sistema/:sistemaId/ficha/:fichaId")
      .post(controller.cadastrar);

  return app;
};
