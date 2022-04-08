const { ipcRenderer } = require('electron')

const WINDOWS_ADB_PATH = 'resources\\extraResources\\adb.exe connect '
const WINDOWS_SCRCPY_PATH = 'resources\\extraResources\\scrcpy.exe -s '
const LINUX_ADB_PATH = 'adb connect '
const LINUX_SCRCPY_PATH = 'scrcpy -s '
const cajillas = [
  { name: 'ch1', IP: '192.168.1.144' },
  { name: 'ch2', IP: '172.29' },
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
    if (failed[0] == 'failed') {
      ipcRenderer.invoke('errorConnect').then(() => {})
    } else {
      if (process.platform == 'win32') {
        scrcpy = require('child_process').exec(WINDOWS_SCRCPY_PATH + cajilla)
      } else {
        scrcpy = require('child_process').exec(LINUX_SCRCPY_PATH + cajilla)
      }
      scrcpy.stdout.on('data', function (data) {
        console.log(data)
      })
    }
  })
}

ch1.addEventListener('click', function (event) {
  id = this.id
  Start(id)
})
