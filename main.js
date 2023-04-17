const {app, BrowserWindow, Menu, ipcMain} = require('electron')
const { autoUpdater } = require('electron-updater')
const path = require('path')
let mainWindow;

function createWindow () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html')

  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  autoUpdater.checkForUpdates();
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

ipcMain.on('app_version', e => {
  e.sender.send('app_version', {version: app.getVersion()})
})

autoUpdater.on('checking-for-update', () => {
  console.log('check update')
  mainWindow.webContents.send('check_update');
})

autoUpdater.on('update-not-available', () => {
  mainWindow.webContents.send('update_not_available');
})

autoUpdater.on('update-available', () => {
  console.log('update')
  mainWindow.webContents.send('update_available');
})

autoUpdater.on('update-downloaded', () => {
  console.log('download success')
  mainWindow.webContents.send('update_download');
})

ipcMain.on('restart_app', () => {
  console.log('restart')
  autoUpdater.quitAndInstall();
})