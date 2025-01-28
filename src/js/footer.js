import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const API_CONFIG = {
  baseURL: 'https://your-energy.b.goit.study/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

const orderSubscription = async email => {
  const api = axios.create(API_CONFIG);
  return await api.post('/subscription', { email });
};

const showSuccessToast = (title, message) => {
  iziToast.success({
    title: title,
    message: message,
  });
};

const handleFormSubmit = async event => {
  event.preventDefault();
  const email = event.target.elements.email.value;

  if (email) {
    try {
      await orderSubscription(email).then(result => {
        showSuccessToast('Success', result.data.message);
        event.target.reset();
      }).catch(error => {
        iziToast.error({
          title: 'Error',
          message: error.response.data.message,
        });
      });
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to process subscription. Please try again.',
      });
    }
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please provide a valid email address.',
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {

  const form = document.querySelector('.footer-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
