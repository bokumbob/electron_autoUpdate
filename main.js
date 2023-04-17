const { app, BrowserWindow, ipcMain } = require("electron");
const { autoUpdater } = require("electron-updater");

let win;

const createWindow = () => {
	win = new BrowserWindow({
		width: 800,
		height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
	});

  win.loadFile("index.html");
};

app.whenReady().then(() => {
	createWindow();
	
  	// 업데이트 사항을 체크하고 알려주는 메서드
	autoUpdater.checkForUpdatesAndNotify();
});

ipcMain.on("app_version", (event) => {
  	// app_version 채널로 현재 version을 보내는 코드
	event.sender.send("app_version", { version: app.getVersion() });
});

autoUpdater.on('checking-for-update', () => {
  mainWindow.webContents.send('check_update');
})

autoUpdater.on("update-available", () => {
	win.webContents.send("update_available");
  // console.log(win.webContents)
  // console.log(sendStatusToWindow)
  autoUpdater.autoDownload()
});

autoUpdater.on("update-downloaded", () => {
	win.webContents.send("update_downloaded");
});

ipcMain.on("restart_app", () => {
  	// restart_app 채널로 수신 받았을 때
  	// autoUpdater의 함수를 사용하여
  	// 일렉트론 앱 종료 후 최신 버전으로 다시 설치
	autoUpdater.quitAndInstall();
});