const { BrowserWindow, app, ipcMain } = require("electron")
const { autoUpdater } = require("electron-updater")
const path = require('path')

let win 

function createWindow () {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow();
    autoUpdater.checkForUpdatesAndNotify();
})

ipcMain.on('app_version', e => {
    e.sender.send('app_version', {version: app.getVersion()});
})

autoUpdater.on('update-available', () => {
    win.webContents.send('update_available');
})

autoUpdater.on('update-downloaded', () => {
    win.webContents.send('update_downloaded');
})

ipcMain.on('restart_app', () => {
    autoUpdater.quitAndInstall();
})

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') app.quit();
})

