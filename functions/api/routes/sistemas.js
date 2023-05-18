/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.sistemas;

  app.route("/listar-sistemas")
      .get(controller.listarSistemas);

  return app;
};
