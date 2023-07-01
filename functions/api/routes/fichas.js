/* eslint linebreak-style: ["error", "windows"]*/
module.exports = (app) => {
  const controller = app.controllers.fichas;

  app.route("/api/v1/sistema/:id/fichas")
      .get(controller.listar);

  app.route("/api/v1/sistema/:id/fichas")
      .post(controller.cadastrar);

  app.route("/api/v1/sistema/:sistema/fichas/:ficha")
      .get(controller.buscar);

  return app;
};
