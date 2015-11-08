

var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.
var Connection = require("./getPort.js");

// Report crashes to our server.
require('crash-reporter').start();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit(0);
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});
  // and load the index.html of the app.
  mainWindow.loadUrl('file://' + __dirname + '/index.html');

  // Open the DevTools.
  mainWindow.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});

// In main process.

var Data = function(){
  var buffer = [];
  this.getData = function(){
    console.log(buffer.length);
    var temp = [];
    temp.push(buffer.shift());
    if(buffer.length == 0) buffer = Connection.getData(); //when empty get new data
    return temp;
  }
}

var data = new Data();

var ipc = require('ipc');

Connection.init();

ipc.on('synchronous-message', function(event, arg) {
  if(arg == 'data?') event.returnValue = data.getData(); //get data from buffer one piece at time
  if(arg == 'ports?') event.returnValue = Connection.getPorts(); //get list of ports
});

ipc.on('portSelection', function(event, arg) {
  Connection.setupConnection(arg.port, arg.rate); //open connection to port
  event.returnValue = "Connected to Port";
});
