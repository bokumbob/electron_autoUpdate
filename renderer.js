// const counter = document.getElementById('counter')

// const version = document.getElementById('version');
// const message = document.getElementById('message');
// const restart = document.getElementById('restart');

// window.electronAPI.checkVersion((event, value) => {
//     version.innerText = value.version
// })

// window.electronAPI.checkUpdate((event, value) => {
//     console.log('업데이트 버전 확인 중')
// })

// window.electronAPI.activeUpdate((event, value) => {
//     console.log('업데이트 준비 완료')
// })

// window.electronAPI.deactiveUpdate((event, value) => {
//     console.log('업데이트 불가')
// })

// window.electronAPI.downloadNewV((event, value) => {
//     message.innerText = '업데이트 파일 다운로드가 완료되었습니다. 재시작 시 업데이트가 반영됩니다.'
// })

// restart.addEventListener('click', () => {
//     console.log('click restart')
//     window.electronAPI.restart();
// })

const version = document.querySelector("#version");

ipcRenderer.send("app_version"); // app_version 채널로 송신
// app_version 채널에서 송신
ipcRenderer.on("app_version", (event, data) => { 
  	// event 모두 종료 후 다음 코드 실행
	ipcRenderer.removeAllListeners("app_version");
  	// 업데이트가 필요한 경우 현재 버전을 알려주는 메시지입니다.
	version.innerText = `현재 버전:  ${data.version}`;
});

const notification = document.querySelector(".notification");
const message = document.querySelector(".update-message");
const closeButton = document.querySelector("#close-button");
const restartButton = document.querySelector("#restart-button");

ipcRenderer.on("update_available", () => {
	ipcRenderer.removeAllListeners("update_available");
	message.innerText = "업데이트 파일을 다운로드 중입니다...";
	notification.classList.remove("hidden");
});

// update_downloaded 채널로 송/수신
ipcRenderer.on("update_downloaded", () => {
	ipcRenderer.removeAllListeners("update_downloaded");
  	// 업데이트 완료 후 해당 메시지를 보여줍니다.
	message.innerText =
		"업데이트 파일 다운로드를 마쳤습니다. \n 재시작을 하면 업데이트 버전이 실행됩니다. \n 재시작 하시겠습니까?";
  	// 닫기 / 재시작 버튼을 렌더링합니다.
	restartButton.classList.remove("hidden");
	notification.classList.remove("hidden");
});

function closeNotification() {
	notification.classList.add("hidden");
}
function restartApp() {
	ipcRenderer.send("restart_app");
}

closeButton.addEventListener("click", closeNotification);
restartButton.addEventListener("click", restartApp);