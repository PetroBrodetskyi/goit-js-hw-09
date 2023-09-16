import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const dateInput = document.getElementById('datetime-picker');

const timerElements = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]')
};

const convertMs = ms => {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  return {
    days: Math.floor(ms / day),
    hours: Math.floor((ms % day) / hour),
    minutes: Math.floor(((ms % day) % hour) / minute),
    seconds: Math.floor((((ms % day) % hour) % minute) / second)
  };
};


let timerInterval = null;
let selectedDate = null;

flatpickr(dateInput, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];
    
    if (selectedDate < new Date()) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

const zeroAdd = value => value.toString().padStart(2, '0');

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  const updateTimer = () => {
    let timeRemaining = selectedDate - new Date();
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      Notify.success('Таймер завершено!');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
    timerElements.days.textContent = zeroAdd(days);
    timerElements.hours.textContent = zeroAdd(hours);
    timerElements.minutes.textContent = zeroAdd(minutes);
    timerElements.seconds.textContent = zeroAdd(seconds);
    timeRemaining -= 1000;
  };

  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});