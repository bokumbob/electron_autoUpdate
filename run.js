const electronInstaller = require('electron-winstaller');
try {
    electronInstaller.createWindowsInstaller({
      appDirectory: '빌드하여 존재하는 일렉트론파일 디렉토리(일반적으로 unpacked가 붙습니다.)',
      outputDirectory: '인스톨러를 만들 디렉토리',
      authors: '권한',
      exe: '빌드하여 만든 일렉트론 파일이름',
      version : "1.0.1",
      title : "company",
    });
    console.log('It worked!');
  } catch (e) {
    console.log(`No dice: ${e.message}`);
  }