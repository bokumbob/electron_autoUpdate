// const { ipcRenderer } = require("electron");

// const information = document.getElementById('info');
// // information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`;

// const fileElem = document.getElementById('file');

// const counter = document.getElementById('counter')

// const func = async () => {
//   const response = await window.versions.ping()
//   const response2 = await window.versions.setTitle('sd');
//   const fileResponese = await window.versions.openFile()
//   information.innerText = response // prints out 'pong'
//   fileElem.innerText = fileResponese // prints out 'pong'
// }

// func()

// window.versions.onUpdateCounter((_event, value) => {
//   const oldValue = Number(counter.innerText)
//   const newValue = oldValue + value
//   counter.innerText = newValue
// })

// const channel = new MessageChannel()

// const port1 = channel.port1
// const port2 = channel.port2

// port2.postMessage({answer:42})

// ipcRenderer.postMessage('port', null, [port1])