'use strict';

const body = document.querySelector('body');
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    const text = `First promise was resolved`;

    resolve(text);
  });

  setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);
});
const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    const text = `Second promise was resolved`;

    resolve(text);
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    const text = `Second promise was resolved`;

    resolve(text);
  });
});
const thirdPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();

      const text = `Third promise was resolved`;

      resolve(text);
    });
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    document.addEventListener('click', () => {
      const text = `Third promise was resolved`;

      resolve(text);
    });
  });
});

function messageSuccess(text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  div.textContent = text;
  body.append(div);
}

function messageError(text) {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  div.textContent = text;
  body.append(div);
}

firstPromise.then(messageSuccess).catch(messageError);
secondPromise.then(messageSuccess);
thirdPromise.then(messageSuccess);
