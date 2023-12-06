// Horario de apertura y cierre
let horario = [{ apertura: "09:00", cierre: "18:00" }];

const datePicker = flatpickr("#datepicker", {
  enableTime: false,
  dateFormat: "Y-m-d",
  minDate: "today",
  onChange: function(selectedDates) {
    // Obtener la fecha seleccionada
    let selectedDate = selectedDates[0].toISOString().split("T")[0];
    let reservas;
    let listaReservasLocalStorage = localStorage.getItem('reservas');
    if(listaReservasLocalStorage){
      reservas = JSON.parse(listaReservasLocalStorage);
    }else{
      reservas = [];
    }
    
    // Filtrar las reservas para la fecha seleccionada
    let reservasFechaSeleccionada = reservas.filter(reserva => reserva.fecha === selectedDate);

    // Obtener las horas reservadas para esa fecha
    let horasReservadas = reservasFechaSeleccionada.map(reserva => reserva.hora);

    // Obtener el horario de apertura y cierre para la fecha seleccionada
    let horarioFechaSeleccionada = horario[0]; // Tomamos el primer elemento del array

    // Obtener la hora de apertura y cierre
    let horaInicio = parseInt(horarioFechaSeleccionada.apertura.split(":")[0], 10);
    let horaFin = parseInt(horarioFechaSeleccionada.cierre.split(":")[0], 10);

    // Habilitar el select
    let timePicker = document.getElementById('timepicker');
    timePicker.disabled = false;

    // Limpiar y agregar opciones al select
    timePicker.innerHTML = '';

    for (let i = horaInicio; i <= horaFin; i++) {
      let option = document.createElement('option');
      option.value = i;
      option.text = i < 10 ? `0${i}:00` : `${i}:00`;

      // Deshabilitar la opción si la hora está reservada
      if (horasReservadas.includes(i)) {
        option.disabled = true;
        option.text += ' (Hora ocupada)';
      }

      timePicker.add(option);
    }
  }
});

// Evento para actualizar la hora seleccionada
document.getElementById('timepicker').addEventListener('change', function() {
  const selectedDate = datePicker.selectedDates[0].toISOString().split("T")[0];
  const selectedHour = this.value;

  // Puedes hacer algo con la fecha y hora seleccionadas
  console.log(`Fecha y hora seleccionadas: ${selectedDate} ${selectedHour}:00`);
});