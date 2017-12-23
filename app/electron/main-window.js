import {
    BrowserWindow,
} from 'electron';
import * as path from 'path';
import MenuBuilder from '../menu';
import Events from '../utils/events';

class MainWindow {
    constructor() {
        this.loadPath = `file://${path.join(__dirname, '../app.html')}`;
        this.window = new BrowserWindow({
            width: 800,
            height: 600,
            minWidth: 800,
            minHeight: 600,
            center: true,
            show: false
        });
    }

    attachMenu() {
        new MenuBuilder(this.window).buildMenu();
    }

    attachEvents() {
        this.window.webContents.on('did-finish-load', () => {
            if (!this.window) {
                throw new Error('"mainWindow" is not defined');
            }
        
            this.window.show();
            this.window.focus();
        });
        
        this.window.on('closed', () => {
            this.window = null;
        });

        Events.on('IMAGE_ADDED', (image) => {
            this.window.webContents.send("IMAGE_ADDED", image);
        });
    }

    show() {
        this.window.loadURL(this.loadPath);
        this.attachEvents();
        this.attachMenu();
    }
}

export default MainWindow;
