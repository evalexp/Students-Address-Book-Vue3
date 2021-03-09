const available_modules = require("./available_module").modules;
const tryRequire = require("try-require");
const _require = (_module) => {
  if (_module in available_modules) {
    let sub_modules = available_modules[_module];
    let _module_obj = {};
    let _act_module = tryRequire(_module);
    if (_act_module === undefined) {
      _act_module = tryRequire(__dirname + "/" + _module);
    }
    for (let i = 0; i < sub_modules.length; i++) {
      _module_obj[sub_modules[i]] = _act_module[sub_modules[i]];
    }
    _module_obj.$require = (_sub_module) => {
      return _module_obj[_sub_module];
    };
    return _module_obj;
  } else {
    return null;
  }
};

const electron = require("electron");

exports.dialog = electron;
exports.import = _require;
