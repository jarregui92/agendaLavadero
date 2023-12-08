import siteConfig from '../siteConfig.js';

//PRE CARGA DE VALORES PARA EL USO DE LA APLICACION
document.addEventListener('DOMContentLoaded', function () {
    //CARGA DE VARIABLES PARA EL PRIMER USO DE LA APP
    let listaVehiculos = siteConfig.listaVehiculos;
    //SE OBTIENE EL FORMULARIO
    let formulario = document.querySelector("#formReservation");

    //SE CREA EL LISTENER PARA EL SUBMIT
    formulario.addEventListener("submit", agendarLavado);

    //////////////////MANEJO DEL LOCAL STORAGE///////////////////

    //SE CREA Y SE CARGA DEL LOCAL STORAGE LA LISTA DE VEHICULOS
    let listaVehiculosArray;
    let listaVehiculosLocalStorage = localStorage.getItem('listaVehiculos');
    //SI LOCAL STORAGE YA ESTA CARGADO CON LA LISTA DE VEHICULOS
    //SE PARSEA, DEL CASO CONTRARIO SE CARGA PARA EL USO
    if (listaVehiculosLocalStorage) {
        listaVehiculosArray = JSON.parse(listaVehiculosLocalStorage)
    } else {
        let listaVehiculosString = JSON.stringify(listaVehiculos);
        localStorage.setItem('listaVehiculos', listaVehiculosString)
        listaVehiculosArray = listaVehiculos;
    }

    //SE CREA Y SE CARGA DEL LOCAL STORAGE LA LISTA DE RESERVAS
    let listaReservasArray;
    let listaReservasLocalStorage = localStorage.getItem('reservations');
    //SI LOCALSTORAGE YA ESTA CARGADO CON LA LISTA DE RESERVAS
    //SE PARSEA, DEL CASO CONTRARIO SE CARGA PARA EL USO
    if (listaReservasLocalStorage) {
        listaReservasArray = JSON.parse(listaReservasLocalStorage);
    } else {
        listaReservasArray = [];
    }

    //CARGA DEL SELECT DEL TIPO DE VEHICULO PARA LAVADO DEL MODAL
    let selectVehicle = document.getElementById('selectVehicle')
    listaVehiculosArray.forEach(vehiculo => {
        let option = document.createElement('option');

        option.value = vehiculo.id;
        option.text = vehiculo.tipo + ' - $' + vehiculo.precio;

        selectVehicle.appendChild(option);
    });


});


//FUNCION DE AGENDAR EL LAVADO
let agendarLavado = function (event) {
    event.preventDefault();

    let inputName = document.getElementById("inputName").value;
    let countrySelect = document.getElementById("countrySelect").value;
    let inputPhone = document.getElementById("inputPhone").value;
    let numberComplete = countrySelect+ ' '+ inputPhone;
    let inputFecha = new Date(document.getElementById("datepicker").value).toISOString().split('T')[0];
    let inputHora = parseInt(document.getElementById("timepicker").value);
    let inputTipo = parseInt(document.getElementById("selectVehicle").value);

    //SE PREGUNTA SI SE DESEA AGENDAR EL LAVADO Y SE MUESTRA UN MENSAJE DE CONFIRMACION
    Swal.fire({
        title: "Estas seguro??",
        text: "Estas a punto de agendar un lavado!",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, agendar!"
    }).then((result) => {
        if (result.isConfirmed) {

            //SE DESCARGA LA ULTIMA VERSION DE LAS RESERVAS DEL LOCAL STORAGE
            let reservasLocalStorage = JSON.parse(localStorage.getItem('reservations'))

            //SE CREA EL CODIGO PARA ASIGNAR LA RESERVA NUEVA
            let idReserva;
            if (reservasLocalStorage === null) {
                reservasLocalStorage = [];
                idReserva = 0;
            } else {
                idReserva = reservasLocalStorage.length;
            }

            //SE CREA EL OBJETO DE LA NUEVA RESERVA
            let nuevaReserva = {
                id: idReserva,
                cliente: inputName,
                telefono: numberComplete,
                fecha: inputFecha,
                hora: inputHora,
                tipo: inputTipo

            }

            //SE AGREGA AL ARRAY
            reservasLocalStorage.push(nuevaReserva)

            //SE ACTUALIZA EL LOCAL STORAGE CON LA INFORMACION NUEVA
            localStorage.setItem('reservations', JSON.stringify(reservasLocalStorage));
            Swal.fire({
                title: "Agendado!",
                text: "Reserva asignada! \n Codigo: " + idReserva + ". \n Nombre: " + inputName + ". \n Dia: " + inputFecha + ". \n Hora: " + inputHora,
                icon: "success",
                showCancelButton: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            }).then((result) => {
                // La función then() se ejecuta cuando se hace clic en el botón "Aceptar" en SweetAlert
                    // Recargar la página
                    location.reload();
            });
        } else {
            Swal.fire({
                title: "Agenda Cancelada!",
                text: "No guardamos los datos.",
                icon: "info"
            });
        }
        closeModal();

    });
};