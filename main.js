const { app, BrowserWindow } = require('electron')
const shell = require('electron').shell
// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname)

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  })

  win.loadFile('src/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})
