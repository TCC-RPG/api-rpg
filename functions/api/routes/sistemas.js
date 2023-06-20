/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.sistemas;

  app.route("/api/v1/sistemas")
      .get(controller.listar);

  app.route("/api/v1/sistemas")
      .post(controller.cadastrar);

  return app;
};
