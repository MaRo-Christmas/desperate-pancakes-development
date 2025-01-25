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

const initToastSettings = () => {
  iziToast.settings({
    theme: 'light',
    timeout: 4000,
    resetOnHover: true,
    position: 'bottomLeft',
    transitionIn: 'flipInX',
    transitionOut: 'flipOutX',
    progressBar: true,
    progressBarColor: 'rgba(252, 0, 0, 0.2)',
    backgroundColor: 'rgba(240, 240, 240, 0.4)',
    titleColor: 'rgba(0, 0, 0, 0.2)',
    messageColor: 'rgba(252, 0, 0, 0.6)',
  });
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
      await orderSubscription(email);
      showSuccessToast('Success', 'You`ve subscribed successfully!');
      event.target.reset();
    } catch (error) {
      iziToast.error({
        title: 'Error',
        message: 'Failed to process subscription. Please try again.',
      });
      console.error('Subscription error:', error);
    }
  } else {
    iziToast.warning({
      title: 'Warning',
      message: 'Please provide a valid email address.',
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  initToastSettings();

  const form = document.querySelector('.footer-form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});
