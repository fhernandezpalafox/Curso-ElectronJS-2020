const {app,BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');
const {ipcMain} = require('electron');


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
            nodeIntegration:true
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


//Async-Await

//Asincrono
ipcMain.on('asincrono-mensaje',(event,args) =>{
  
  //TODO lo que tiene de argumentos
  console.log('Lo que tienen de argumentos');
  console.log(args);

  event.sender.send('asincrono-respuesta','Asincrono Hola a todos');

});

//Sincrono
ipcMain.on('sincrono-mensaje',(event,args) =>{
  
  //TODO lo que tiene de argumentos
  console.log('Lo que tienen de argumentos');
  console.log(args);

  event.returnValue  = 'Sincrono Hola a todos';

});


app.on('ready',createWindow);






