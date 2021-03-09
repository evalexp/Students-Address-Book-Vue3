const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");

let win = null;

function createWindow() {
  win = new BrowserWindow({
    width: 1600,
    height: 850,
    webPreferences: {
      preload: path.join(app.getAppPath(), "preload/index.js"),
      contextIsolation: false,
    },
  });

  // production
  win.loadFile("dist/index.html");
  // dev
  // win.loadURL("http://localhost:8080");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const file_filter = [
  {
    name: "Backup Files",
    extensions: ["bak", "backup"],
  },
  {
    name: "JSON",
    extensions: ["json"],
  },
];

ipcMain.on("Save-Dialog", (event, arg) => {
  event.returnValue = dialog.showSaveDialogSync(win, {
    message: "请选择数据备份存储位置",
    title: "请选择数据备份存储位置",
    defaultPath: app.getPath("home") + "/AdressBook.bak",
    filters: file_filter,
  });
});

ipcMain.on("Open-Dialog", (event, arg) => {
  event.returnValue = dialog.showOpenDialogSync(win, {
    message: "请选择备份数据存储位置",
    title: "请选择备份数据存储位置",
    defaultPath: app.getPath("home"),
    filters: file_filter,
  });
});

ipcMain.on("Window-Maximize", (event, arg) => {
  win.maximize();
  event.returnValue = 1;
});

ipcMain.on("Window-Unmaximize", (event, arg) => {
  win.unmaximize();
  event.returnValue = 1;
});
