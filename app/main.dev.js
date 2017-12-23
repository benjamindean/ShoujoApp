import {
    app,
    ipcMain,
    dialog
} from 'electron';
import unpack from './electron/unpack';
import MainWindow from './electron/main-window';

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
    const path = require('path');
    const p = path.join(__dirname, '..', 'app', 'node_modules');
    require('module').globalPaths.push(p);
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [
        'REACT_DEVELOPER_TOOLS',
        'REDUX_DEVTOOLS'
    ];

    return Promise
        .all(extensions.map(name => installer.default(installer[name], forceDownload)))
        .catch(console.log);
};

app.on('window-all-closed', async () => {
    await unpack.deleteFolder();

    if (process.platform !== 'darwin') {
        app.quit();
    }
});

ipcMain.on('open-file', () => {
    openFile();
});

function openFile() {
    dialog.showOpenDialog({
        title: 'Open File',
        properties: ['openFile'],
        // defaultPath: '',
        filters: [{
            name: 'Archives',
            // extensions: appConfig.supportedFormats
        }]
    }, async (filePath) => {
        if (!filePath) return;
        console.log(filePath);
        await unpack.unpack(filePath);
        // config.set('fileBrowserPath', path.dirname(filePath[0]));
        // this.handleFile(filePath[0]);
    });
}

app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        await installExtensions();
    }

    new MainWindow().show();
});
