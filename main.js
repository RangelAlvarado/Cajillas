const { app, BrowserWindow } = require('electron')

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 400,
    height: 200,
  })

  //use bytenode to convert js files to jsc
  const bytenode = require('bytenode')
  let main = bytenode.compileFile({
    filename: './temp.js',
    output: './main.jsc',
  })
  let index = bytenode.compileFile({
    filename: 'src/temp.js',
    output: 'src/index.jsc',
  })
  //convert other Node.js files as required
}

app.whenReady().then(() => {
  createWindow()
})
