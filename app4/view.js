let $ = require('jquery');
let fs = require('fs'); //NodeJS

let filename = "contactos.txt";
let numero = 0;

$('#addcontact').on('click',() =>{
    let nombre  = $('#txtNombre').val();
    let correo  = $('#txtCorreo').val();

    fs.appendFileSync(filename,nombre+','+correo+'\n');

    //TODO funcion para llenar la tabla HTML
    addContacto(nombre, correo);
});


function addContacto(nombre,correo){

    if(nombre && correo){
        numero++; 
        //ES6
        let  estructuraHtml = `<tr> 
                                    <td>${numero}</td>
                                    <td>${nombre}</td>
                                    <td>${correo}</td>
                                </tr>`;

          $("#contact-table").append(estructuraHtml);                      
        
    }

}

function loadContactos(){
    
    if(fs.existsSync(filename)){
        let data =  fs.readFileSync(filename,'utf8').split('\n');

        data.forEach((contacto,index)=>{

            let [nombrev,correov] = contacto.split(',');
             
            addContacto(nombrev,correov);
        });

    }else {  //callback
        fs.writeFile(filename,'',(err) =>{
           if(err)
             console.log(err);
        });
    }
}

loadContactos();