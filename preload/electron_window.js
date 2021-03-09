const ipcRender = require("electron").ipcRenderer;

const maximize = () => {
  ipcRender.sendSync("Window-Maximize");
};

const unmaximize = () => {
  ipcRender.sendSync("Window-Unmaximize");
};

exports.maximize = maximize;
exports.unmaximize = unmaximize;
