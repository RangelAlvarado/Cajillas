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
    resizable: false,
    icon: __dirname + '/logo.png',
  })

  win.loadFile('src/index.html')
  //win.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()
})

ipcMain.handle('errorConnect', async (event) => {
  const messageBoxOptions = {
    type: 'error',
    title: 'Error en la conexion',
    message:
      'No se ha podido conectar con la cajilla\nAsegurate de que la cajilla este encendida y con red decawifi',
  }
  dialog.showMessageBoxSync(messageBoxOptions)
})

ipcMain.handle('errorNoDecawifi', async (event) => {
  const messageBoxOptions = {
    type: 'error',
    title: 'No es el wifi correcto',
    message:
      'Hey que xopa no tas en decawifi',
  }
  dialog.showMessageBoxSync(messageBoxOptions)
})
