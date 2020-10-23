const {app,BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');
const {ipcMain} = require('electron');
const {dialog} =  require('electron');
const fs = require('fs');


app.setPath("userData", __dirname + "/grabaciones");


app.on('before-quit',()=> {
  console.log("Saliendo...");
});

let win;


function createWindow(){

    win = new BrowserWindow({
        width: 350,
        height:600,
        title: 'Decima aplicación',
        center: true,
        maximizable: false,
        resizable: false,
        webPreferences:{
            nodeIntegration:true
        }
    });

    win.loadURL(
      url.format({
          pathname: path.join(__dirname,'index.html'), 
          protocol: 'file:',
          slashes:true 
      })
  );

}


ipcMain.on('saveFile', async (event,imageBuffer) =>{

  var path =  await dialog.showSaveDialog(win, null || { properties: [] });

   fs.writeFile(path.filePath,imageBuffer.data,(err) =>{
    if(err)
      console.log(err);
   });  

});



app.on('ready',createWindow);




