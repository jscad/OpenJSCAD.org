const { ipcRenderer } = require('electron')
var data = ipcRenderer.sendSync('get-file-data')
if (data === null) {
  console.log('There is no file')
} else {
  // Do something with the file.
  console.log(data)
}
ipcRenderer.send('asynchronous-message', 'ping')
ipcRenderer.on('asynchronous-reply', (event, arg) => {
  console.log(arg) // prints "pong"
})
