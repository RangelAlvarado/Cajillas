const { ipcRenderer } = require('electron')
let cajillas = [
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
    //let spawn = require('child_process').spawn
    adb = require('child_process').exec(
      'resources\\extraResources\\adb.exe connect ' + cajilla,
    )
    adb.stdout.on('data', function (data) {
      console.log(data)
      var failed = data.split(' ')
      if (failed[0] == 'failed' || failed[0] == 'cannot') {
        ipcRenderer.invoke('errorConnect').then(() => {})
      }
    })
    setTimeout(() => {
      scrcpy = require('child_process').exec(
        'resources\\extraResources\\scrcpy.exe -s ' + cajilla,
      )
    }, 2000)
  } else {
    adb = require('child_process').exec('adb connect ' + cajilla)
    adb.stdout.on('data', function (data) {
      console.log(data)
      var failed = data.split(' ')
      if (failed[0] == 'failed') {
        ipcRenderer.invoke('errorConnect').then(() => {})
      }
    })
  }
}

ch1.addEventListener('click', function (event) {
  id = this.id
  Start(id)
})
