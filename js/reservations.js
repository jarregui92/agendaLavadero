// CONFIGURACION DEL HORARIO DE LA EMPRESA
import siteConfig from '../siteConfig.js';

//SE OBTIENE LA CONFIGURACION DEL HORARIO DE LA EMPRESA
let scheduleConfiguration = siteConfig.scheduleConfiguration;

  //SE OBTIENE LA HORA ACTUAL Y SE LE SUMA 1 PARA QUE NO SE PUEDA AGENDAR CON MENOS DE UNA HORA DE ANTELACION
  let now = new Date();
  let nowHour = now.getHours();
  let minSelectableHour = nowHour + 1;

 //SE OBTIENE LA HORA ACTUAL Y SE LE SUMA 1 PARA QUE NO SE PUEDA AGENDAR CON MENOS DE UNA HORA DE ANTELACION
 let minDate = new Date(now);
 if (minSelectableHour > 17) {
   // SI LA HORA MINIMA SELECCIONABLE ES DESPUES DE LAS 17, SE ESTABKECE LA FECHA MINIMA EL DIA DE MAÑANA
   minDate.setDate(now.getDate() + 1);
  } else {
    //DE LO CONTARRIO, LA FECHA MINIMA ES HOY
    minDate.setDate(now.getDate());
 }

const datePicker = flatpickr("#datepicker", {
  enableTime: false,
  dateFormat: "Y-m-d",
  minDate: minDate,
  // fp_incr ES UNA FUNCION PROPIA DE FLATPICKR QUE INCREMENTA UNA FECHA, LA CUAL LE RESTO UNO PARA Q SEAN 10 DIAS
  maxDate: minDate.fp_incr(scheduleConfiguration.maxDaysForReservations -1),
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
      if (reservationHours.includes(i) || i < minSelectableHour) {
        option.disabled = true;
        option.text += ' (Hora no disponible)';
      }

      timePicker.add(option);
    }
  }
});