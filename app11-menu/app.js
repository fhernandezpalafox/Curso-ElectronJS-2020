const {app,BrowserWindow,Menu,MenuItem} = require('electron');
const url  = require('url');
const path = require('path');


app.on('before-quit',()=> {
  console.log("Saliendo...");
});

let win;


function createWindow(){

    win = new BrowserWindow({
        width: 800,
        height:600,
        title: 'Cuarta aplicación',
        center: true,
        maximizable: false,
        webPreferences:{
            nodeIntegration:true,
            enableRemoteModule: true //Se agrega esta instruccion fix
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

const isMac = process.platform === 'darwin'

 const templateMenu  = [
  {
    label: 'File',
    submenu: [
      isMac ? { role: 'close' } : { role: 'quit' },{label:'Ayuda'}
    ]
  },
   {
    label:'Editar',
    submenu: [
      {
        role: 'undo'
      },
      {
        role:'redo'
      },
      {
        type:'separator'
      },
      {
        role: 'cut'
      },
      {
        role:'copy'
      },
      {
        role:'paste'
      }
    ]
   },
   {
     label:'Vista',
     submenu:[
       {
         role: 'reload'
       },
       {
        role: 'toggledevtools'
      },
      {
        role:'help'
      }
     ]
   },
   
 ];


 const menu =  Menu.buildFromTemplate(templateMenu);
 Menu.setApplicationMenu(menu);


app.on('ready',createWindow);




