const electron = require("electron");
const url = require("url");
const path = require("path");
const serialport = require("serialport");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let COMWindow;

global.sharedObject = {
    someProperty: "default value"
};

// Listen for app to be ready
app.on("ready", function() {
    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load HTML into window
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "mainwindow.html"),
            protocol: "file:",
            slashes: true
        })
    );
    // Quit app when close
    mainWindow.on("closed", function() {
        app.quit();
    });
    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    // Insert the menu
    Menu.setApplicationMenu(mainMenu);
});

// Handle COM Ports
function connectComPorts() {
    // Create new window
    COMWindow = new BrowserWindow({
        width: 300,
        height: 350,
        title: "Select COM Ports",
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load HTML into window
    COMWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "comwindow.html"),
            protocol: "file:",
            slashes: true
        })
    );

    // Garbage Collection Handler
    COMWindow.on("close", function() {
        COMWindow = null;
    });
}

// Create menu template
const mainMenuTemplate = [
    {
        label: "File",
        submenu: [
            {
                label: "Connect COM",
                click() {
                    connectComPorts();
                }
            },
            {
                label: "Quit",
                accelerator:
                    process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                }
            }
        ]
    },
    {
        label: "Developer Tools",
        submenu: [
            {
                role: "reload"
            },
            {
                label: "Toggle DevTools",
                accelerator:
                    process.platform == "darwin" ? "Command+I" : "Ctrl+I",
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    }
];
