/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.fichas;

  app.route("/api/v1/listar-fichas/:id")
      .get(controller.listar);

  return app;
};
