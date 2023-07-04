/* eslint-disable max-len */
/* eslint linebreak-style: ["error", "windows"]*/

module.exports = () => {
  const util = {};

  util.start = (mapa, doc) => {
    let valor = null;

    if (doc.data().formula != undefined && doc.data().formula != null && doc.data().formula !== "") {
      let formula = doc.data().formula;
      const formulaSplited = formula.split(/[*/+-]/g);

      for (const pedaco of formulaSplited) {
        if (pedaco.trim().startsWith("#")) {
          const campo = pedaco.replace("#", "");
          const valorCampo = mapa.get(campo).toString();
          formula = formula.replace(pedaco, valorCampo);
        }
      }

      valor = eval(formula);
    } else {
      valor = mapa.get(doc.id);
    }


    if (valor == undefined) {
      if (doc.data().tipo === "number") {
        valor = 0;
      }
    }

    return valor;
  };

  return util;
};
