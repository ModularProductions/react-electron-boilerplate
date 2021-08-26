const path = require("path");

const { app, BrowserWindow } = require("electron");
const isDev = require("electron-is-dev");

// Conditionally include the dev tools installer to load React Dev Tools
let installExtension, REACT_DEVELOPER_TOOLS;
if (isDev) {
  const devTools = require("electron-devtools-installer");
  installExtension = devTools.default;
  REACT_DEVELOPER_TOOLS = devTools.REACT_DEVELOPER_TOOLS;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
  app.quit();
}

let mainWindow;
   
const createWindow = () => {
  mainWindow = new BrowserWindow({ 
    width: 480,
    height: 320,
    webPreferences: {
      nodeIntegration: true
    }
  });
  
  const appUrl = isDev ? 'http://localhost:3000' :
    `file://${path.join(__dirname, '../build/index.html')}`
  mainWindow.loadURL(appUrl)
  // mainWindow.maximize()
  mainWindow.setFullScreen(false)

  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: "detach" });
  }

  mainWindow.on('closed', () => mainWindow = null)

}
app.whenReady().then(() => {
  createWindow();

  if (isDev) {
    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Added Extension: ${name}`))
      .catch(error => console.log(`An error occurred: , ${error}`))
  }
});
app.on('window-all-closed', () => {
  // Follow OS convention on whether to quit app when
  // all windows are closed.
  if (process.platform !== 'darwin') { app.quit() }
})
app.on('activate', () => {
  // If the app is still open, but no windows are open,
  // create one when the app comes into focus.
  if (mainWindow === null) { createWindow() }
})