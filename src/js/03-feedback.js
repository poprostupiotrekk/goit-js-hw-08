import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';

const fbackForm = document.querySelector('.feedback-form');
const { email, message } = fbackForm.elements;

let dataForm = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const onDataInput = e => {
  dataForm = { email: email.value, message: message.value };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dataForm));
};

const onFormSubmit = e => {
  e.preventDefault();
  
  if (email.value === '' || message.value === '') {
    return alert(`Please fill in all required fields.`);
  }
  
  console.log({ email: email.value, message: message.value });

  localStorage.removeItem(STORAGE_KEY);
  e.currentTarget.reset();
  dataForm = {};
};

const pageReload = () => {
  if (dataForm) {
    email.value = dataForm.email || '';
    message.value = dataForm.message || '';
  }
};

fbackForm.addEventListener('input', throttle(onDataInput, 500));
fbackForm.addEventListener('submit', onFormSubmit);

pageReload();