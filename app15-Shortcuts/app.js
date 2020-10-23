const {app, BrowserWindow, Menu, MenuItem} = require('electron')
const url = require('url')
const path = require('path')
const {ipcMain} = require('electron');
const {dialog} =  require('electron');
const fs = require('fs');


let win

function createWindow() {
   win = new BrowserWindow(
      {   width: 800,
          height: 600,
          frame: false,
          webPreferences: {
            nodeIntegration:true,
            enableRemoteModule: true 
          }
      })
   win.loadURL(url.format ({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file:',
      slashes: true
   }))
}

app.on('browser-window-created',function(e,window) {
   window.setMenu(null);
});


ipcMain.on('openFile',async (event,args) =>{

   const chosenFolders = await dialog.showOpenDialog(win, null || { properties: ['openDirectory','openFile'] });
   var pathFile = chosenFolders.filePaths[0];
   fs.readFile(pathFile,'utf-8',(err, data) => {
     if (err) {
       alert("Error al leer el archivo " + err);
       return;
     }
     event.sender.send('fileData', data);
   });
 
 });



app.on('ready', createWindow)