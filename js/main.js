//PRE CARGA DE VALORES PARA EL USO DE LA APLICACION
document.addEventListener('DOMContentLoaded', function () {
    //CARGA DE VARIABLES PARA EL PRIMER USO DE LA APP
    let listaVehiculos = [{
            'id': 1,
            'tipo': 'Camioneta',
            'precio': 700
        },
        {
            'id': 2,
            'tipo': 'Auto',
            'precio': 500
        },
        {
            'id': 3,
            'tipo': 'Moto',
            'precio': 200
        },
    ];

    let reservasToLocalStorage = [{
            id: 0,
            cliente: 'Julian Arregui',
            telefono: '+99 566 566',
            fecha: '2023-11-25',
            hora: 13,
            tipo: 1
        },
        {
            id: 1,
            cliente: 'Andrea Rogelio',
            telefono: '+54−9−11−1234−5678',
            fecha: '2023-11-26',
            hora: 14,
            tipo: 1
        },
        {
            id: 2,
            cliente: 'Martina Gómez',
            telefono: '+54−9−11−8765−4321',
            fecha: '2023-11-27',
            hora: 15,
            tipo: 2
        },
        {
            id: 3,
            cliente: 'Pablo Herrera',
            telefono: '+99 555 555',
            fecha: '2023-11-28',
            hora: 10,
            tipo: 1
        },
        {
            id: 4,
            cliente: 'Laura Fernández',
            telefono: '+54−9−11−2345−6789',
            fecha: '2023-11-29',
            hora: 16,
            tipo: 2
        },
        {
            id: 5,
            cliente: 'Alejandro Torres',
            telefono: '+99 444 444',
            fecha: '2023-11-30',
            hora: 12,
            tipo: 1
        },
        {
            id: 6,
            cliente: 'Valentina Ruiz',
            telefono: '+54−9−11−9876−5432',
            fecha: '2023-12-01',
            hora: 17,
            tipo: 2
        },
        {
            id: 7,
            cliente: 'Lucía Sánchez',
            telefono: '+99 333 333',
            fecha: '2023-12-02',
            hora: 11,
            tipo: 1
        },
        {
            id: 8,
            cliente: 'Nicolás Méndez',
            telefono: '+54−9−11−3456−7890',
            fecha: '2023-12-03',
            hora: 18,
            tipo: 2
        },
        {
            id: 9,
            cliente: 'Carolina Vargas',
            telefono: '+99 222 222',
            fecha: '2023-12-04',
            hora: 9,
            tipo: 1
        },
        {
            id: 10,
            cliente: 'Matías Peralta',
            telefono: '+54−9−11−6543−2109',
            fecha: '2023-12-05',
            hora: 19,
            tipo: 2
        },
        {
            id: 10,
            cliente: 'Matías Peralta',
            telefono: '+54−9−11−6543−2109',
            fecha: '2023-12-06',
            hora: 16,
            tipo: 2
        }
    ]


    //SE OBTIENE EL FORMULARIO
    let formulario = document.querySelector("#agendaLavadoForm");

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
    let listaReservasLocalStorage = localStorage.getItem('reservas');
    //SI LOCALSTORAGE YA ESTA CARGADO CON LA LISTA DE RESERVAS
    //SE PARSEA, DEL CASO CONTRARIO SE CARGA PARA EL USO
    if (listaReservasLocalStorage) {
        listaReservasArray = JSON.parse(listaReservasLocalStorage);
    } else {
        listaReservasArray = [];
    }

    //CARGA DEL SELECT DEL TIPO DE VEHICULO PARA LAVADO DEL MODAL
    let selectTipo = document.getElementById('selectTipo')
    listaVehiculosArray.forEach(vehiculo => {
        let option = document.createElement('option');

        option.value = vehiculo.id;
        option.text = vehiculo.tipo + ' - $' + vehiculo.precio;

        selectTipo.appendChild(option);
    });


});


//FUNCION DE AGENDAR EL LAVADO
let agendarLavado = function (event) {
    event.preventDefault();

    let inputNombre = document.getElementById("inputNombre").value;
    let inputTelefono = document.getElementById("inputTelefono").value;
    let inputFecha = new Date(document.getElementById("datepicker").value).toISOString().split('T')[0];
    let inputHora = parseInt(document.getElementById("timepicker").value);
    let inputTipo = parseInt(document.getElementById("selectTipo").value);


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
            let reservasLocalStorage = JSON.parse(localStorage.getItem('reservas'))

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
                cliente: inputNombre,
                telefono: inputTelefono,
                fecha: inputFecha,
                hora: inputHora,
                tipo: inputTipo

            }

            //SE AGREGA AL ARRAY
            reservasLocalStorage.push(nuevaReserva)

            //SE ACTUALIZA EL LOCAL STORAGE CON LA INFORMACION NUEVA
            localStorage.setItem('reservas', JSON.stringify(reservasLocalStorage));
            Swal.fire({
                title: "Agendado!",
                text: "Reserva asignada! \n Codigo: " + idReserva + ". \n Nombre: " + inputNombre + ". \n Dia: " + inputFecha + ". \n Hora: " + inputHora,
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




//ADMIN SECTION
function adminCMDInfo() {
    console.log("\x1b[1m=========================================================");
    console.log("|                     ADMIN CMD                         |");
    console.log("=========================================================");
    console.log("|  \x1b[32m'comandos'\x1b[0m         |  Lista de Comandos              |");
    console.log("|  \x1b[32m'reservas'\x1b[0m         |  Muestra la lista de reservas   |");
    console.log("|  \x1b[32m'clsReservas'\x1b[0m      |  Remueve todas las reservas     |");
    console.log("=========================================================");
    console.log('Los comandos se ejecutan con adminCMD("comando")')

}

function listarReservas() {
    let listaReservas = JSON.parse(localStorage.getItem('reservas'))
    listaReservas === null ? console.log('No hay registros') : console.table(listaReservas)
}

function borrarListaReservas() {
    localStorage.clear('reservas');
    let listaReservas = JSON.parse(localStorage.getItem('reservas'))
    listaReservas === null ? console.log('No hay registros') : console.table(listaReservas)
}

function adminCMD(comando) {
    switch (comando) {
        case "comandos":
            //SE MUESTRAN LA LISTA DE COMANDOS
            console.log("Ejecutando comando list...");
            adminCMDInfo();
            break;

        case "reservas":
            console.log("Ejecutando comando reservas...");
            listarReservas();
            break;

        case "clsReservas":
            console.log("Ejecutando comando clsReservas...");
            borrarListaReservas();
            break;

        default:
            console.log("Comando no reconocido");
            // Lógica para el caso por defecto
            break;
    }
}

adminCMDInfo()