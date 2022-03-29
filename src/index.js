const electron = require('electron')
// Enable live reload for all the files inside your project directory
//require('electron-reload')(__dirname)

let cajillas = [
  { "name": "ch1", "IP": "172.29.33.53" },
  { "name": "ch2", "IP": "172.29" },
];

function Start(id) {
  console.log(id)
  //let cajilla = cajillas.filter(i => i.name == id)
  //let cajilla = cajillas.filter(function (cajilla) { return cajilla.name == id });
  let cajilla = cajillas.filter(c => c.name == id)
  cajilla = cajilla.map(c => c.IP)
  if (process.platform == 'win32') {
    let spawn = require("child_process").spawn;

    let bat = spawn("cmd.exe", [
    "/c",          // Argument for cmd.exe to carry out the specified script
    process.env.PORTABLE_EXECUTABLE_DIR+"\resources\extraResources\scrcpy.exe", // Path to your file
    "-s",   // First argument
    cajilla    // n-th argument
]);
    //var child = require('child_process').exec(
    //  '.\resources\extraResources\scrcpy.exe -s '+cajilla,
    //)
    console.log(child)
  } else {
    var child = require('child_process').exec('scrcpy -s '+cajilla)
  }
}

ch1.addEventListener('click', function (event) {
  id = this.id
  //alert(app.getAppPath())
  Start(id)
})
