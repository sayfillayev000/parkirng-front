const { app, BrowserWindow } = require("electron/main");
const path = require("node:path");

const isDev = !app.isPackaged;
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    fullscreen: true,
    kisok: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // devTools: false,
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://172.25.24.220:5173");
  } else {
    mainWindow.loadURL(`file://${path.join(__dirname, "dist/index.html")}`);
  }
  //   if (input.type === "keyDown" && input.key === "F12") {
  //     if (mainWindow.webContents.isDevToolsOpened()) {
  //       mainWindow.webContents.closeDevTools();
  //     } else {
  //       mainWindow.webContents.openDevTools();
  //     }
  //     event.preventDefault();
  //   }

  //   // CTRL + SHIFT + I kombinatsiyasini bloklash
  //   if (input.control && input.shift && input.key.toLowerCase() === "i") {
  //     event.preventDefault();
  //   }
  // });
}

app.whenReady().then(() => {
  createWindow();
  checkForUpdates();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
  // mainWindow.webContents.on("before-input-event", (event, input) => {
  //   if (input.control && input.shift && input.key.toLowerCase() === "i") {
  //     // mainWindow.webContents.openDevTools();
  //     event.preventDefault();
  //   }
  //   if (input.key === "F12") {
  //     // mainWindow.webContents.openDevTools();
  //     event.preventDefault();
  //   }
  //   if (input.control && input.shift && input.alt && input.key.toLowerCase() === "d") {
  //     mainWindow.webContents.openDevTools();
  //   }
  // });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
