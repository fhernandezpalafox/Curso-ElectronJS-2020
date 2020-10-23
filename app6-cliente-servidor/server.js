var net  =  require('net');


var server =  net.createServer(function(connection){
    console.log('Cliente conectado');

    connection.on('end', function(){
        console.log('Cliente desconectado');
    });

   
   connection.write("Hola alumnos de ISSC311");
   connection.pipe(connection);  

});

server.listen(8080, function(){
   console.log("El servidor se esta ejecutando en el puerto 8080");
});