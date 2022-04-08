const { ipcRenderer } = require('electron')

const WINDOWS_ADB_PATH = 'resources\\extraResources\\adb.exe connect '
const WINDOWS_SCRCPY_PATH = 'resources\\extraResources\\scrcpy.exe -s '
const LINUX_ADB_PATH = 'adb connect '
const LINUX_SCRCPY_PATH = 'scrcpy -s '
const cajillas = [
  { name: 'plvelocidad', IP: '172.29.33.224' },
  { name: 'plaaa', IP: '172.29.33.222' },
  { name: 'placapulco' , IP: '172.29.32.48'},
  { name: "cnn", IP: '172.29.32.132'},
  { name: "historych", IP: '172.29.32.190'},
  {name: 'discovery', IP: '172.29.34.206'}
]

function Start(id) {
  console.log(id)
  //let cajilla = cajillas.filter(i => i.name == id)
  let cajilla = cajillas.filter((c) => c.name == id)
  cajilla = cajilla.map((c) => c.IP)
  let adb, scrcpy
  if (process.platform == 'win32') {
    adb = require('child_process').exec(WINDOWS_ADB_PATH + cajilla)
  } else {
    adb = require('child_process').exec(LINUX_ADB_PATH + cajilla)
  }
  adb.stdout.on('data', function (data) {
    console.log(data)
    var failed = data.split(' ')
    if (failed[0] == 'failed' || failed[0] == 'cannot') {
      ipcRenderer.invoke('errorConnect').then(() => {})
    } else {
      if (process.platform == 'win32') {
        scrcpy = require('child_process').exec(WINDOWS_SCRCPY_PATH + cajilla)
      } else {
        scrcpy = require('child_process').exec(LINUX_SCRCPY_PATH + cajilla)
      }
      scrcpy.stderr.on('data', function (data) {
        console.log(data)
      })
    }
  })
}

cnn.addEventListener('click', function (event) {
  id = this.id
  cnn.innerHTML = '<i class="spinner"></i> loading...'
  Start(id)
  // loadingWindow();
  
})
historych.addEventListener('click', function (event) {
  id = this.id
  Start(id)
  // loadingWindow();
  
})
discovery.addEventListener('click', function (event) {
  id = this.id
  Start(id)
  // loadingWindow();
  
})
plvelocidad.addEventListener('click', function (event) {
  id = this.id
  Start(id)
  // loadingWindow();
  
})
plaaa.addEventListener('click', function (event) {
  id = this.id
  Start(id)
  // loadingWindow();
  
})
placapulco.addEventListener('click', function (event) {
  id = this.id
  Start(id)
  // loadingWindow();
  
})
// function loadingWindow() {
//   ipcRenderer.invoke('loadingWindow').then(() => {})
// }