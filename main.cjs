const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");
const isDev = !app.isPackaged;
function createWindow() {
  const win = new BrowserWindow({
    fullscreen: true,
    kiosk: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools(); // DevTools'ni avtomatik ochish
  } else {
    // Production rejimi → build fayllarni yuklash
    win.loadFile(path.join(__dirname, "dist/index.html"));
  }
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
