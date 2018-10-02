const { app, BrowserWindow } = require('electron');
const path = require('path');

let win;

function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        title: 'My first app',
        webPreferences: {
            nodeIntegration: false,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadURL(`file://${__dirname}/index.html`);
}

app.on('ready', createWindow);
