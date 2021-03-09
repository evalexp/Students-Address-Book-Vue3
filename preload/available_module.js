exports.modules = {
  fs: ["writeFile"],
  db: [
    "getAllData",
    "removeDataByCode",
    "getDataByFilter",
    "insertData",
    "getAllDataFromFile",
    "updateByCode",
    "studentExist",
  ],
  time: ["sleep"],
  dialog: ["showSaveDialogSync", "showOpenDialogSync"],
  electron_window: ["maximize", "unmaximize"],
};
