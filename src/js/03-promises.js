import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  if (e.currentTarget.delay.value < 0 || e.currentTarget.amount.value <= 0) {
    return Notify.warning("Delay step and amount values must be positive numbers and the amount value must be more than zero");
} 

  let delay = Number(e.currentTarget.delay.value);
  const step = Number(e.currentTarget.step.value);
  const amount = Number(e.currentTarget.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;
    const PromiseObj = {
      position,
      delay,
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(PromiseObj);
      } else {
          reject(PromiseObj);
      }
      }, delay)
    });
  }