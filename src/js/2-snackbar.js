import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');



form.addEventListener('submit', (event) => {

    event.preventDefault();

  const delay = Number(form.delay.value);
  const state = form.state.value;

  createPromise(delay, state)
    .then(processFulfilled)
        .catch(processRejected);
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

function processFulfilled(result) {
  console.log(`Promise resolved after ${result}ms`);
  iziToast.success({
    title: 'OK',
    message: `Promise resolved after ${result}ms`,
    closeOnClick: 'true',
    position: 'topLeft',
    backgroundColor: 'green',
  });
}

function processRejected(error) {
  console.log(`Promise rejected after ${error}ms`);
    iziToast.error({
      title: 'Error',
      message: `Promise rejected after ${error}ms`,
      backgroundColor: 'red',
      closeOnClick: 'true',
      position: 'topLeft'
    });
}

