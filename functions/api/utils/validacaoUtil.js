/* eslint linebreak-style: ["error", "windows"]*/

module.exports = () => {
  const util = {};

  util.stringIsNull = (string) => {
    return string == undefined || string == null || string === "";
  };

  return util;
};
