import { app, Menu, shell, BrowserWindow } from 'electron';
import Electron = require('electron');
import * as path from 'path';
import * as _ from 'lodash';
import async = require('async');

let menu: any, template: any, mainWindow: Electron.BrowserWindow = null;

if (process.env.NODE_ENV === 'development') {
    require('electron-debug');
}

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') app.quit();
});

app.on('ready', () => {

});

app.on('ready', function () {
    async.series(
        [
            function (callback) {
                installExtensions(callback);
            },
            function (callback) {
                createWindow(callback);
            }
        ], function (err, results) {
            if (err) {
                console.error("error = ", err.stack);
            }
            console.log("results = ", results);
        });
});

app.on('activate', () => {

    if (mainWindow === null) {
        createWindow();
    }
});



const installExtensions = function (callback: AsyncResultCallback<string>) {
    if (process.env.NODE_ENV === 'development') {
        const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

        const extensions = [
            'REACT_DEVELOPER_TOOLS',
            'REDUX_DEVTOOLS'
        ];
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
        for (const name of extensions) {
            try {
                installer.default(installer[name], forceDownload);
            } catch (e) {
            } // eslint-disable-line
        }
    }

    if (callback) {
        callback(null, "install extensions success");
    }
};

function createWindow(callback?: AsyncResultCallback<string>) {

    mainWindow = new BrowserWindow({
        show: false,
        width: 900,
        height: 800
    });

    const indexUrl = path.join(__dirname, "../static" + "/index.html");
    mainWindow.loadURL("file://" + indexUrl);

    mainWindow.webContents.on('did-finish-load', () => {
        console.log("!!!!! did finish load called");
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;  //clean up and deference the window object.
    });

    if (process.env.NODE_ENV === 'development') {
        mainWindow.webContents.openDevTools();

        mainWindow.webContents.on('context-menu', (e, props) => {
            const {x, y} = props;

            Menu.buildFromTemplate([{
                label: 'Inspect element',
                click() {
                    mainWindow.webContents.inspectElement(x, y);
                }
            }]).popup(mainWindow);
        });
    }

    if (process.platform === 'darwin') {
        template = [{
            label: 'Electron',
            submenu: [{
                label: 'About ElectronReact',
                selector: 'orderFrontStandardAboutPanel:'
            }, {
                type: 'separator'
            }, {
                label: 'Services',
                submenu: []
            }, {
                type: 'separator'
            }, {
                label: 'Hide ElectronReact',
                accelerator: 'Command+H',
                selector: 'hide:'
            }, {
                label: 'Hide Others',
                accelerator: 'Command+Shift+H',
                selector: 'hideOtherApplications:'
            }, {
                label: 'Show All',
                selector: 'unhideAllApplications:'
            }, {
                type: 'separator'
            }, {
                label: 'Quit',
                accelerator: 'Command+Q',
                click() {
                    app.quit();
                }
            }]
        }, {
            label: 'Edit',
            submenu: [{
                label: 'Undo',
                accelerator: 'Command+Z',
                selector: 'undo:'
            }, {
                label: 'Redo',
                accelerator: 'Shift+Command+Z',
                selector: 'redo:'
            }, {
                type: 'separator'
            }, {
                label: 'Cut',
                accelerator: 'Command+X',
                selector: 'cut:'
            }, {
                label: 'Copy',
                accelerator: 'Command+C',
                selector: 'copy:'
            }, {
                label: 'Paste',
                accelerator: 'Command+V',
                selector: 'paste:'
            }, {
                label: 'Select All',
                accelerator: 'Command+A',
                selector: 'selectAll:'
            }]
        }, {
            label: 'View',
            submenu: (process.env.NODE_ENV === 'development') ? [{
                label: 'Reload',
                accelerator: 'Command+R',
                click() {
                    mainWindow.webContents.reload();
                }
            }, {
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }, {
                label: 'Toggle Developer Tools',
                accelerator: 'Alt+Command+I',
                click() {
                    mainWindow.webContents.toggleDevTools();
                }
            }] : [{
                label: 'Toggle Full Screen',
                accelerator: 'Ctrl+Command+F',
                click() {
                    mainWindow.setFullScreen(!mainWindow.isFullScreen());
                }
            }]
        }, {
            label: 'Window',
            submenu: [{
                label: 'Minimize',
                accelerator: 'Command+M',
                selector: 'performMiniaturize:'
            }, {
                label: 'Close',
                accelerator: 'Command+W',
                selector: 'performClose:'
            }, {
                type: 'separator'
            }, {
                label: 'Bring All to Front',
                selector: 'arrangeInFront:'
            }]
        }, {
            label: 'Help',
            submenu: [{
                label: 'Learn More',
                click() {
                    shell.openExternal('http://electron.atom.io');
                }
            }, {
                label: 'Documentation',
                click() {
                    shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
                }
            }, {
                label: 'Community Discussions',
                click() {
                    shell.openExternal('https://discuss.atom.io/c/electron');
                }
            }, {
                label: 'Search Issues',
                click() {
                    shell.openExternal('https://github.com/atom/electron/issues');
                }
            }]
        }];
    }

    if (callback) {
        callback(null, "create window success");
    }
}
