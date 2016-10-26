const {app, Menu, shell, BrowserWindow} = require('electron');
const path = require('path');
const _ = require('lodash');

let menu, template, mainWindow = null;

if (process.env.NODE_ENV === 'development') {
     require('electron-debug')();
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('ready', delayWindowCreation);

app.on('activate', () => {

    if (mainWindow === null) {
		delayWindowCreation();
    }
});

function delayWindowCreation(){
	_.delay(() => {
		createWindow();
	}, 500);
}

function createWindow() {
    mainWindow = new BrowserWindow({
		show: false,
        width: 800,
        height: 600
    });

    const indexUrl = path.join(__dirname, "../static" + "/index.html");
    mainWindow.loadURL("file://"+indexUrl);

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
}

