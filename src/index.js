const electron = require('electron')
// Enable live reload for all the files inside your project directory
//require('electron-reload')(__dirname)
function isWindows(id) {
  alert(id)
  console.log(process.platform)
  if (process.platform == 'win32') {
    var child = require('child_process').exec(
      './extraResources/scrcpy.exe -s 192.168.1.144',
    )
  } else {
    var child = require('child_process').exec('scrcpy -s 192.168.1.144')
  }
}

ch1.addEventListener('click', function (event) {
  id = '192.168.1.144'
  isWindows(id)
})
