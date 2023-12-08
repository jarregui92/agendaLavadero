//CONFIGURACION DEL SITIO A GUSTO DEL ADMIN
const siteConfig = {
    //CONFIGURACION DE VEHICULOS ACEPTADOS PARA LAVAR
    listaVehiculos: [
        { id: 1, tipo: 'Camioneta', precio: 700 },
        { id: 2, tipo: 'Auto', precio: 500 },
        { id: 3, tipo: 'Moto', precio: 200 }
    ],

    //CONFIGURACION DEL HORARIO DE LA EMPRESA Y MAXIMO DE DIAS DE AGENDA
    scheduleConfiguration: { open: '09:00', close: '18:00', maxDaysForReservations: 10 }
};

export default siteConfig;