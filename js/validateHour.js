// CONFIGURACION DEL HORARIO DE LA EMPRESA
import siteConfig from '../siteConfig.js';

//SE OBTIENE LA CONFIGURACION DEL HORARIO DE LA EMPRESA
let scheduleConfiguration = siteConfig.scheduleConfiguration;


const datePicker = flatpickr("#datepicker", {
  enableTime: false,
  dateFormat: "Y-m-d",
  minDate: "today",
  maxDate: new Date().fp_incr(scheduleConfiguration.maxDaysForReservations),
  onChange: function(selectedDates) {
    // OBTENER LA FECHA SELECCIONADA
    let selectedDate = selectedDates[0].toISOString().split("T")[0];
    let reservations;
    let reservationsListLocalStorage = localStorage.getItem('reservations');
    if(reservationsListLocalStorage){
      reservations = JSON.parse(reservationsListLocalStorage);
    }else{
      reservations = [];
    }
    
    // FILTARR LAS RESERVAS PARA LA FECHA SELECCIONADA
    let selectedDateReservations = reservations.filter(reserva => reserva.fecha === selectedDate);

    // SE OBTIENE LAS HORAS RESERVADAS PARA ESA FECHA
    let reservationHours = selectedDateReservations.map(reserva => reserva.hora);

    //SE OBTIENE LA HORA DE APERTURA Y CIERRE DE LA EMPRESA
    let hourStart = parseInt(scheduleConfiguration.open.split(":")[0], 10);
    let hourEnd = parseInt(scheduleConfiguration.close.split(":")[0], 10);

    // SE HABILITA EL SELECT
    let timePicker = document.getElementById('timepicker');
    timePicker.disabled = false;

    // SE LIMPIA EL SELECT POR SI TRAE INFORMACION ANTERIOR
    timePicker.innerHTML = '';

    // SE ITERA SOBRE LAS HORAS DISPONIBLES Y CREA OPCIONES PARA EL SELECT
    for (let i = hourStart; i <= hourEnd; i++) {
      let option = document.createElement('option');
      option.value = i;
      // SE FORMATEA EL TEXTO PARA LA OPCION (SI ES MENOR A 10 AGREGA UN 0 ANTES)
      option.text = i < 10 ? `0${i}:00` : `${i}:00`;

      // SE DESHABILITA LA OPCION SI LA HORA ESTA RESERVADA Y SE AGREGA UN TEXTO AL LADO EXPLICANDO PQ NO PUEDE SER SELECCIONADA
      if (reservationHours.includes(i)) {
        option.disabled = true;
        option.text += ' (Hora ocupada)';
      }

      timePicker.add(option);
    }
  }
});