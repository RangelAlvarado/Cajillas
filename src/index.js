const { ipcRenderer } = require('electron')
let id
const WINDOWS_ADB_PATH = 'resources\\extraResources\\adb.exe connect '
const WINDOWS_SCRCPY_PATH = 'resources\\extraResources\\scrcpy.exe -s '
const LINUX_ADB_PATH = 'adb connect '
const LINUX_SCRCPY_PATH = 'scrcpy -s '
const cajillas = [
  { name: 'plvelocidad', IP: '172.29.33.224' },
  { name: 'plaaa', IP: '172.29.33.222' },
  { name: 'placapulco' , IP: '172.29.32.48' },
  { name: "cnn", IP: '172.29.32.132' },
  { name: "historych", IP: '172.29.32.190' },
  { name: 'discovery', IP: '172.29.34.206' }
]

function Start(id,idName) {
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
      document.getElementById(id).innerHTML= '&#10060';
      ipcRenderer.invoke('errorConnect').then(() => {
        document.getElementById(id).innerHTML= idName
      })
    } else {
      if (process.platform == 'win32') {
        scrcpy = require('child_process').exec(WINDOWS_SCRCPY_PATH + cajilla)
      } else {
        scrcpy = require('child_process').exec(LINUX_SCRCPY_PATH + cajilla)
      }
      scrcpy.stderr.on('data', function (data) {
        console.log(data)
        document.getElementById(id).innerHTML= '&#10004;&#65039;'
      })
      scrcpy.on('close', function() {
        document.getElementById(id).innerHTML= idName
    });
    }
  })
}

cnn.addEventListener('click', function (event) {
  id = this.id
  idName = "CNN"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})
historych.addEventListener('click', function (event) {
  id = this.id
  idName = "History  Channel"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})
discovery.addEventListener('click', function (event) {
  id = this.id
  idName = "Discovery Channel"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})
plvelocidad.addEventListener('click', function (event) {
  id = this.id
  idName = "Pluto TV Velocidad"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})
plaaa.addEventListener('click', function (event) {
  id = this.id
  idName = "Pluto TV Lucha Libre"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})
placapulco.addEventListener('click', function (event) {
  id = this.id
  idName = "Pluto TV Acapulco Shore"
  document.getElementById(id).innerHTML = "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id,idName)
})