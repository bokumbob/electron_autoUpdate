// const { contextBridge, ipcRenderer } = require('electron');

// // contextBridge.exposeInMainWorld('versions', {
// //   // versions라는 이름의 변수로 아래 값들을 renderer에서 사용할 수 있도록 한다
// //   node: () => process.versions.node,
// //   chrome: () => process.versions.chrome,
// //   electron: () => process.versions.electron,
// //   ping: () => ipcRenderer.invoke('ping'),
// //   setTitle: (title) => ipcRenderer.send('set-title', title),
// //   openFile: () => ipcRenderer.invoke('dialog:openFile'),
// //   onUpdateCounter: callback => ipcRenderer.on('update-counter', callback)
// // });

// // contextBridge.exposeInMainWorld('darkMode', {
// //   toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
// //   system: () => ipcRenderer.invoke('dark-mode:system'),
// // })

// // contextBridge.exposeInMainWorld(
// //   'shell',
// //   {
// //     open: () => ipcRenderer.send('shell:open'),
// //   }
// // )

// // contextBridge.exposeInMainWorld('electron', {
// //   startDrag: (fileName) => {
// //     ipcRenderer.send('ondragstart', fileName)
// //   }
// // })

// // contextBridge.exposeInMainWorld('notification', {
// //   mainNo: (callback) => {
// //     ipcRenderer.on('notification', callback)
// //   }
// // })

// contextBridge.exposeInMainWorld('checkVersion', {
//   version2: (callback) => ipcRenderer.on('app_version', callback)
// })



const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  checkVersion: (callback) => {
    ipcRenderer.send('app_version');
    ipcRenderer.removeAllListeners('app_version')
    ipcRenderer.on('app_version', callback);
  },
  checkUpdate: (callback) => {
    ipcRenderer.send('check_update');
    ipcRenderer.removeAllListeners('check_update')
    ipcRenderer.on('check_update', callback);
  },
  activeUpdate: (callback) => {
    ipcRenderer.send('update_available');
    ipcRenderer.removeAllListeners('update_available')
    ipcRenderer.on('update_available', callback);
  },
  downloadNewV: (callback) => {
    ipcRenderer.send('update_downloaded');
    ipcRenderer.removeAllListeners('update_downloaded');
    ipcRenderer.on('update_downloaded', callback);  
  },
  restart: () => ipcRenderer.send('restart_app') 
})