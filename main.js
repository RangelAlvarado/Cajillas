const { app, BrowserWindow, ipcMain } = require('electron')
const { dialog } = require('electron')
// Enable live reload for all the files inside your project directory
//require('electron-reload')(__dirname)
function createWindow() {
  win = new BrowserWindow({
    width: 968,
    height: 625,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    resizable: false
  })

  win.loadFile('src/index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('errorConnect', async (event) => {
  const messageBoxOptions = {
    type: 'error',
    title: 'Error en la conexion',
    message:
      'No se ha podido conectar con la cajilla\nAsegurate de estar en la misma red.\nSi es la primera vez que te conectas dale permiso a la cajilla para conectarse a tu PC',
  }
  dialog.showMessageBoxSync(messageBoxOptions)
})

// ipcMain.handle('loadingWindow', async (event) => {
//   loading = new BrowserWindow({
//     width: 400,
//     height: 100,
//     autoHideMenuBar: true,
//     webPreferences: {
//       nodeIntegration: true,
//     },
//   })

//   win.loadFile('src/index.html')
// })