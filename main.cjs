const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const isDev = !app.isPackaged;
function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    // kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // if (isDev) {
  //   win.loadURL("http://172.25.24.220:5173");
  // } else {
  //   // win.webContents.openDevTools();
  // }
  win.loadFile(path.join(__dirname, "dist/index.html"));
  win.webContents.on("before-input-event", (event, input) => {
    if (input.type === "keyDown" && input.key === "F12") {
      if (win.webContents.isDevToolsOpened()) {
        win.webContents.closeDevTools();
      } else {
        win.webContents.openDevTools();
      }
      event.preventDefault(); // F12 ni brauzerga uzatilishini to‘xtatadi
    }
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
