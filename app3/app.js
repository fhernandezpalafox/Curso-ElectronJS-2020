
const {app,BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');

//console.dir(app);

app.on('before-quit',()=> {
  console.log("Saliendo...");
});

let win;


function createWindow(){

    win = new BrowserWindow({
        width: 800,
        height:600,
        title: 'Tercera aplicación',
        center: true,
        maximizable: false,
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

app.on('ready',createWindow);




