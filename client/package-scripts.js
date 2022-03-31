const globalAutoConfigurations = require('@bison/global-auto-configurations');

const packageScripts = {
  scripts: Object.assign({}, globalAutoConfigurations.packageScripts.scripts),
};

module.exports = packageScripts;
