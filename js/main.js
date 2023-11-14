
let listaVehiculos = [//Se pre cargan los precios de los lavados
{'tipo': 'Camioneta', 'precio': 700},
{'tipo': 'Auto', 'precio': 500},
{'tipo': 'Moto', 'precio': 200},
]; 

function agendar(){
    //DEFINICION DE VARIABLES
    let cliente;
    let opcionSeleccionada;
    let clienteVehiculo;
    while(cliente === undefined || cliente === null){
        cliente = prompt("Bienvenido a la agenda de Lavado de Vehículos, Ingrese su nombre!");//Se obtiene el nombre del cliente
       }
       
       while(opcionSeleccionada != 0 && opcionSeleccionada != 1){
           opcionSeleccionada = parseInt(prompt("Bienvenido "+cliente+". \n Ingrese la opción deseada \n ------------------------ \n 0- Agendar Lavado \n 1- Salir"))
       }
       
       if(opcionSeleccionada == 0){
           //OPCION AGENDAR LAVADO
           while(clienteVehiculo != 0 && clienteVehiculo != 1 && clienteVehiculo != 2 && clienteVehiculo != 3){ //VALIDAMOS QUE INGRESE UNA DE LAS OPCIONES DADAS
               clienteVehiculo = parseInt(prompt(cliente+" que vehículo quieres agendar?: \n 0- Camionetas: $700 \n 1- Autos: $500 \n 2- Motos: $200 \n 3- Salir" ))
           }
       
           if(clienteVehiculo == 0 || clienteVehiculo == 1 || clienteVehiculo == 2){
               //SI ELIGIO UN VEHICULO CORRECTAMENTE SE LE MUESTRA EL RECIBO CON LA INFORMACION PARA CONFIRMAR LA AGENDA
               let confirmarReserva;
       
               while(confirmarReserva != 'S' && confirmarReserva != 'N'){
                   confirmarReserva = prompt("DETALLE DE LA AGENDA \n -------------------- \n Confirma la agenda de lavado de: \n Vehículo: " +listaVehiculos[clienteVehiculo].tipo+ " \n Por el valor de : $"+listaVehiculos[clienteVehiculo].precio + "\n Estas de acuerdo con la información? (S/N)").toUpperCase();
               }
       
               if(confirmarReserva == 'S'){
                   alert(cliente+", Se confirmó la agenda de lavado \n DETALLE DE LA AGENDA \n --------------- \n Vehículo: " +listaVehiculos[clienteVehiculo].tipo+ " \n Por el valor de : $"+listaVehiculos[clienteVehiculo].precio)
               }else{
                   alert("Adiós "+cliente+", te esperamos pronto")
               }
       
           }else if(clienteVehiculo == 3){
               //OPCION SALIR
               alert("Adiós "+cliente+", te esperamos pronto")
           }
       }else if(opcionSeleccionada == 1){
           //OPCION SALIR
           alert("Adíos "+cliente+", te esperamos pronto")
       }
}