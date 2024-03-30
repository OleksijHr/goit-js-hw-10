// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";



// Get element date input, start btn, data: days, hours, min, sec
const inputDatePickerRef = document.querySelector('#datetime-picker');
const btnStartRef =  document.querySelector('[data-start]');
const daysRef =  document.querySelector('[data-days]');
const hoursRef =  document.querySelector('[data-hours]');
const minutesRef =  document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');


// Set initial value
let timeDifference = 0;
let timerId = null;
let formatDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentDifferenceDate(selectedDates[0]);
  },
};

btnStartRef.setAttribute('disabled', true);

// Initial flatpickr
flatpickr(inputDatePickerRef, options);

// Set click event listener on button start
btnStartRef.addEventListener('click', onBtnStart);

document.addEventListener("keydown", (event) => {
  resetTimer();
})



// Start timer
function onBtnStart() {
  timerId = setInterval(startTimer, 1000);
}

//date checking and rendering of date difference
function currentDifferenceDate(selectedDates) {
  const currentDate = Date.now();

  if (selectedDates < currentDate) {
    btnStartRef.setAttribute('disabled', true);
    return iziToast.error({
      title: 'Error',
      message: 'Illegal operation',
      backgroundColor: 'red',
      closeOnClick: true,
      position: 'topCenter'
});
  }

  timeDifference = selectedDates.getTime() - currentDate;
  formatDate = convertMs(timeDifference);

  renderDate(formatDate);
  btnStartRef.removeAttribute('disabled');
}

//Timer
function startTimer() {
  btnStartRef.setAttribute('disabled', true);
  inputDatePickerRef.setAttribute('disabled', true);

  timeDifference -= 1000;

  if (secondsRef.textContent <= 0 && minutesRef.textContent <= 0) {
    iziToast.success({
      message: 'Time end',
      backgroundColor: 'green',
      closeOnClick: true,
      closeOnEscape: true,
      position: 'topCenter'
    });

    clearInterval(timerId);
  } else {
    formatDate = convertMs(timeDifference);
    renderDate(formatDate);
  }
}

// Rendering date
function renderDate(formatDate) {
  daysRef.textContent = formatDate.days.toString().padStart(2, "0");
  hoursRef.textContent = formatDate.hours.toString().padStart(2, "0");
  minutesRef.textContent = formatDate.minutes.toString().padStart(2, "0");
  secondsRef.textContent = formatDate.seconds.toString().padStart(2, "0");
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
  return { days, hours, minutes, seconds };
}

function resetTimer() {
  clearInterval(timerId);
  flatpickr(inputDatePickerRef, options).setDate(new Date());
  renderDate({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  btnStartRef.removeAttribute('disabled');
  inputDatePickerRef.removeAttribute('disabled');
}