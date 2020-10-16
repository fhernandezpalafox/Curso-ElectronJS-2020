
const {app,BrowserWindow} = require('electron');
const url  = require('url');
const path = require('path');
const {ipcMain} = require('electron');


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



ipcMain.on('abrirArchivo',(event,path) =>{
  
  const {dialog} =  require('electron');
  const fs = require('fs');

  dialog.showOpenDialog(function(filenames){
      
      if(filenames === undefined){
        console.log('Archivo no seleccionado');
      } else {
        leerArchivo(filenames[0]);
      }
  });

  /*dialog.showOpenDialog(win, {
    properties: ['openFile', 'openDirectory']
  }).then(result => {
    console.log(result.canceled)
    console.log(result.filePaths)
  }).catch(err => {
    console.log(err)
  })*/



  function leerArchivo(filepath){
    
    const options = {
      type: 'info',
      buttons: ['Aceptar'],
      defaultId: 2,
      title: 'Abrir archivo',
      message: 'Error al leer el archivo',
      detail: 'Lectura de archivo'
    };
  
       fs.readFile(filepath,'utf-8',(err,data) =>{
          
        if(err){
          dialog.showMessageBox(win, options, (response, checkboxChecked) => {
               console.log(response);
           });
           return;
        }
  
        event.sender.send('datosarchivo',data);
  
       });
  }

});



app.on('ready',createWindow);






