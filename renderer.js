const counter = document.getElementById('counter')

const version = document.getElementById('version');
const message = document.getElementById('message');
const restart = document.getElementById('restart');

window.electronAPI.checkVersion((event, value) => {
    version.innerText = value.version
})

window.electronAPI.activeUpdate((event, value) => {
    console.log('업데이트 준비 완료')
})

window.electronAPI.downloadNewV((event, value) => {
    message.innerText = '업데이트 파일 다운로드가 완료되었습니다. 재시작 시 업데이트가 반영됩니다.'
})

restart.addEventListener('click', () => {
    window.electronAPI.restart();
})