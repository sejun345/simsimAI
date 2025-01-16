const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    mainWindow.loadFile('index.html');
});

ipcMain.on('run-troubleshooter', () => {
    // Windows 인터넷 해결사 실행 명령어
    const command = 'msdt.exe /id NetworkDiagnosticsNetworkAdapter';
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
        }
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }
        console.log(`Stdout: ${stdout}`);
    });
});