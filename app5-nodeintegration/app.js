
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
        title: 'Quinta aplicación',
        center: true,
        maximizable: false,
        webPreferences:{
            nodeIntegration:true,
            contextIsolation: false,
        }
    });

    win.loadURL(
      url.format({
          pathname: path.join(__dirname,'index.html'),  //c:felipe/proyecto/app2/index.html
          protocol: 'file:',
          slashes:true 
      })
  );

}

app.on('ready',createWindow);




