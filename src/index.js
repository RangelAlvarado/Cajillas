const { ipcRenderer } = require('electron')
let id
const WINDOWS_ADB_PATH = 'resources\\extraResources\\adb.exe connect '
const WINDOWS_SCRCPY_PATH = 'resources\\extraResources\\scrcpy.exe -s '
const LINUX_ADB_PATH = 'adb connect '
const LINUX_SCRCPY_PATH = 'scrcpy -s '
const cajillas = [
  { name: 'escaleras1', IP: '172.29.32.23' },
  { name: 'escaleras2', IP: '172.29.32.35' },
  { name: 'bistro1', IP: '172.29.32.51' },
  { name: 'bistro2', IP: '172.29.32.77' },
  { name: 'discoverpb', IP: '172.29.36.66' },
  { name: 'recepcion4', IP: '172.29.35.17' },
  { name: 'recepcion3', IP: '172.29.32.14' },
  { name: 'recepcion2', IP: '172.29.32.86' },
  { name: 'recepcion1', IP: '172.29.32.11' },
  { name: 'fusion', IP: '172.29.32.224'},
]

function Start(id, idName) {
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
      document.getElementById(id).innerHTML = '&#10060'
      ipcRenderer.invoke('errorConnect').then(() => {
        document.getElementById(id).disabled = false
        document.getElementById(id).innerHTML = idName
      })
    } else {
      if (process.platform == 'win32') {
        scrcpy = require('child_process').exec(WINDOWS_SCRCPY_PATH + cajilla)
      } else {
        scrcpy = require('child_process').exec(LINUX_SCRCPY_PATH + cajilla)
      }
      scrcpy.stderr.on('data', function (data) {
        failed = data.split(' ')
        if (failed[2] == 'connection') {
          document.getElementById(id).innerHTML = '&#10060'
          ipcRenderer.invoke('errorConnect').then(() => {
            document.getElementById(id).disabled = false
            document.getElementById(id).innerHTML = idName
          })
        } else if (failed[0] != 'ERROR:') {
          document.getElementById(id).innerHTML = '&#10004;&#65039;'
        }
      })
      scrcpy.on('close', function (data) {
        if (data != 1) {
          document.getElementById(id).disabled = false
          document.getElementById(id).innerHTML = idName
        }
      })
    }
  })
}

escaleras1.addEventListener('click', function (event) {
  id = this.id
  idName = 'Escaleras 1'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})
escaleras2.addEventListener('click', function (event) {
  id = this.id
  idName = 'Escaleras 2'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})
bistro1.addEventListener('click', function (event) {
  id = this.id
  idName = 'Bistro Afuera 1'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})
bistro2.addEventListener('click', function (event) {
  id = this.id
  idName = 'Bistro Afuera 2'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})
discoverpb.addEventListener('click', function (event) {
  id = this.id
  idName = 'Discover PB'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})
recepcion1.addEventListener('click', function (event) {
  id = this.id
  idName = 'Recepcion 1'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})

recepcion2.addEventListener('click', function (event) {
  id = this.id
  idName = 'Recepcion 2'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})

recepcion3.addEventListener('click', function (event) {
  id = this.id
  idName = 'Recepcion 3'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})

recepcion4.addEventListener('click', function (event) {
  id = this.id
  idName = 'Recepcion 4'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})

fusion.addEventListener('click', function (event) {
  id = this.id
  idName = 'Fusion'
  document.getElementById(id).disabled = true
  document.getElementById(id).innerHTML =
    "<div class='spinner-border' role='status'><span class='sr-only'></span></div>"
  Start(id, idName)
})