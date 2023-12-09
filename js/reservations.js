// CONFIGURACION DEL HORARIO DE LA EMPRESA
import siteConfig from '../siteConfig.js';

//SE OBTIENE LA CONFIGURACION DEL HORARIO DE LA EMPRESA
let scheduleConfiguration = siteConfig.scheduleConfiguration;

  //SE OBTIENE LA HORA ACTUAL Y SE LE SUMA 1 PARA QUE NO SE PUEDA AGENDAR CON MENOS DE UNA HORA DE ANTELACION
  let now = new Date();
  let minSelectableHour = now.getHours() + 1;

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

    //SE OBTIENE LA HORA ACTUAL
    let currentHour = now.getHours();
    
    // SE ITERA SOBRE LAS HORAS DISPONIBLES ENTRE LA HORA DE APERTURA Y CIERRE
    for (let i = hourStart; i <= hourEnd; i++) {
        let option = document.createElement('option');
        // ASIGNO EL VALOR DE LA OPCION OSEA LA HORA ACTUAL EN ESTA ITERACION
        option.value = i;
        // Se formatea el texto para la opción (si es menor a 10 agrega un 0 antes)
        option.text = i < 10 ? `0${i}:00` : `${i}:00`;
    
        // Condición actualizada: deshabilitar si la hora ya ha pasado hoy
        if (
            (now.toISOString().split("T")[0] === selectedDate && i <= currentHour) ||
            reservationHours.includes(i)
        ) {
            option.disabled = true;
            option.text += ' (Hora no disponible)';
        }
    
        timePicker.add(option);

    }
  }
});