const ipcRender = require("electron").ipcRenderer;

const showSaveDialogSync = () => {
  return ipcRender.sendSync("Save-Dialog");
};

const showOpenDialogSync = () => {
  return ipcRender.sendSync("Open-Dialog");
};

exports.showSaveDialogSync = showSaveDialogSync;
exports.showOpenDialogSync = showOpenDialogSync;
