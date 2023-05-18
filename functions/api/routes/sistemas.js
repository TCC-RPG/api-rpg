/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.sistemas;

  app.route("/api/v1/listar-sistemas")
      .get(controller.listar);

  return app;
};
