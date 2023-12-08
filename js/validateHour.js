// CONFIGURACION DEL HORARIO DE LA EMPRESA
import siteConfig from '../siteConfig.js';
let businessHours = siteConfig.businessHours;

const datePicker = flatpickr("#datepicker", {
  enableTime: false,
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function(selectedDates) {
    // Obtener la fecha seleccionada
    let selectedDate = selectedDates[0].toISOString().split("T")[0];
    let reservations;
    let reservationsListLocalStorage = localStorage.getItem('reservations');
    if(reservationsListLocalStorage){
      reservations = JSON.parse(reservationsListLocalStorage);
    }else{
      reservations = [];
    }
    
    // Filtrar las reservas para la fecha seleccionada
    let selectedDateReservations = reservations.filter(reserva => reserva.fecha === selectedDate);

    // Obtener las horas reservadas para esa fecha
    let reservationHours = selectedDateReservations.map(reserva => reserva.hora);

    // Obtener la hora de apertura y cierre
    let hourStart = parseInt(businessHours.open.split(":")[0], 10);
    let hourEnd = parseInt(businessHours.close.split(":")[0], 10);

    // Habilitar el select
    let timePicker = document.getElementById('timepicker');
    timePicker.disabled = false;

    // Limpiar y agregar opciones al select
    timePicker.innerHTML = '';

    for (let i = hourStart; i <= hourEnd; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i < 10 ? `0${i}:00` : `${i}:00`;

      // Deshabilitar la opción si la hora está reservada
      if (reservationHours.includes(i)) {
        option.disabled = true;
        option.text += ' (Hora ocupada)';
      }

      timePicker.add(option);
    }
  }
});