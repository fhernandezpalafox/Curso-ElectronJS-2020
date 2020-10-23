const {app,BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');
const {ipcMain} = require('electron');
const {dialog} =  require('electron');
const {systemPreferences} =  require('electron');
const fs = require('fs');


app.on('before-quit',()=> {
  console.log("Saliendo...");
});

let win;
function createWindow(){
    win = new BrowserWindow({
        width: 800,
        height:600,
        title: 'Quinta aplicación',
        center: true,
        maximizable: false,
        webPreferences:{
            nodeIntegration:true,
        }
    });

    win.loadURL(
      url.format({
          pathname: path.join(__dirname,'index.html'),  //c:felipe/proyecto/app2/index.html
          protocol: 'file:',
          slashes:true 
      })
  );

  
  const success = await systemPreferences.askForMediaAccess("camera");
  console.log(success);  

}



ipcMain.on('openFile',async (event,args) =>{

  const chosenFolders = await dialog.showOpenDialog(win, null || { properties: ['openDirectory','openFile'] });
  var pathFile = chosenFolders.filePaths[0];
  fs.readFile(pathFile,'utf-8',(err, data) => {
    if (err) {
      alert("Error al leer el archivo " + err);
      return;
    }
    event.sender.send('datosarchivo', data);
  });

});

ipcMain.on('openFileImg',async (event,args) =>{

  const chosenFolders = await dialog.showOpenDialog(win, null || { properties: ['openDirectory','openFile'] });
  
  var pathFile = chosenFolders.filePaths[0];
  fs.readFile(pathFile, function (err, data) {
    var newPath = __dirname + "/uploads/" + path.basename(pathFile);;
      fs.writeFile(newPath, data, function (err) {
        console.log(err);
    });
    event.sender.send('nuevoarchivo', newPath);
  });


  

});

ipcMain.on('saveFile', async (event,args) =>{
  var path =  await dialog.showSaveDialog(win, null || { properties: [] });
  //console.log(path);
   fs.writeFile(path.filePath,args,(err) =>{
    if(err)
      console.log(err);
   });
});


app.on('ready',createWindow);






