import axios from 'axios';
import icons from '../images/modal-window-sprite.svg';

const BASE_URL = 'https://your-energy.b.goit.study/api/exercises/';
let currentExerciseId = null;
let removeFromFavorites = false;
let fetchExercises;

// Елементи модального вікна з вправами
const modalWindow = document.querySelector('.modal-overlay');
const exercisesWindow = document.querySelector('.exercise');
const closeButton = document.querySelector('.modal-close-button');
const exerciseGif = document.querySelector('.modal-image-gif');
const exerciseName = document.querySelector('.modal-info-name');
const ratingScore = document.querySelector('.modal-info-rating-score');
const ratingStars = document.querySelector('.modal-info-rating-stars-filled');
const targetsList = document.querySelector('.modal-info-targets-list');
const description = document.querySelector('.modal-info-description');
const addToFavorites = document.querySelector('.add-to-favorites');
const giveRating = document.querySelector('.give-a-rating');

// Елементи модального вікна з рейтингом
const ratingWindow = document.querySelector('.rating');
const form = document.getElementById('userForm');
const closeRatingButton = document.querySelector('.modal-close-rating-button');
const radioButtons = document.querySelectorAll('.custom-radio-star');
const scoreValue = document.querySelector('.modal-rating-block-score-value');
const errorLabel = document.querySelector('.modal-error-label-text');
let rate;

function removeModalEventListeners() {
  closeButton.removeEventListener('click', closeModal);
  modalWindow.removeEventListener('click', modalOutsideClick);
  document.removeEventListener('keydown', modalKeydown);
  resetFields();
}

function closeModal() {
  modalWindow.classList.remove('is-open');
  removeModalEventListeners();
}

function modalOutsideClick(event) {
  if (event.target === modalWindow) {
    modalWindow.classList.remove('is-open');
    removeModalEventListeners();
  }
}

function modalKeydown(event) {
  if (event.key === 'Escape') {
    modalWindow.classList.remove('is-open');
    removeModalEventListeners();
  }
}

function resetFields() {
  removeFromFavorites = false;
  currentExerciseId = null;
  rate = 0;
}

function addEventListenersOnModal() {
  closeButton.addEventListener('click', closeModal);
  modalWindow.addEventListener('click', modalOutsideClick);
  document.addEventListener('keydown', modalKeydown);
}

function handleAddToFavorites() {
  addToFavorites.removeEventListener('click', addToFavoritesHandler);
  addToFavorites.addEventListener('click', addToFavoritesHandler);
}

function addToFavoritesHandler(event) {
  event.preventDefault();
  const storage = JSON.parse(window.localStorage.getItem('favorites'));
  if (!storage || !storage.length) {
    window.localStorage.setItem(
      'favorites',
      JSON.stringify([fetchExercises['_id']])
    );
  } else if (!storage.includes(fetchExercises['_id'])) {
    window.localStorage.setItem(
      'favorites',
      JSON.stringify([...storage, fetchExercises['_id']])
    );
  }
  if (removeFromFavorites) {
    const updatedFavorites = storage.filter(
      item => item !== fetchExercises['_id']
    );
    window.localStorage.setItem(
      'favorites',
      JSON.stringify([...updatedFavorites])
    );
    // Перевірка, чи доступна функція перед викликом
    if (typeof window.removeExerciseFromFavoritesWithAnimation === 'function') {
      window.removeExerciseFromFavoritesWithAnimation(fetchExercises['_id']); // Виклик функції тільки якщо вона є
      closeModal(); //модальне вікно закривається після натискання кнопки remove exercise
    }
  }
  toggleFromFavorites(fetchExercises['_id']);
}

function toggleFromFavorites(id) {
  const favorites = JSON.parse(window.localStorage.getItem('favorites'));
  if (favorites && favorites.length && favorites.includes(id)) {
    removeFromFavorites = true;
    addToFavorites.innerHTML = `Remove from favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='${icons}#icon-trash'></use>
                        </svg>`;
  } else {
    removeFromFavorites = false;
    addToFavorites.innerHTML = `Add to favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='${icons}#icon-heart-favorites'></use>
                        </svg>`;
  }
}

// ______________________ADD RATING LOGIC______________________________________________________________

function openRating() {
  exercisesWindow.classList.add('hide-window');
  setTimeout(() => {
    ratingWindow.classList.remove('hide-window');
  }, 150);
}

function closeRating() {
  ratingWindow.classList.add('hide-window');
  setTimeout(() => {
    scoreValue.innerText = '0.0';
    radioButtons.forEach(star => {
      star.classList.remove('checked-rating');
    });
    exercisesWindow.classList.remove('hide-window');
    form.reset();
  }, 150);
}

function setRatingScore(event) {
  event.preventDefault();
  rate = event.target.value;
  scoreValue.innerText = `${rate}.0`;
  radioButtons.forEach(star => {
    if (Number(star.value) <= Number(rate)) {
      star.classList.add('checked-rating');
    } else {
      star.classList.remove('checked-rating');
    }
  });
}

function submitRatingForm(event) {
  event.preventDefault();
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  const emailPattern = /^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  if (formObject.email && !emailPattern.test(formObject.email.toString())) {
    errorLabel.innerText = 'Invalid email format';
    return;
  }

  if (rate) {
    formObject['rate'] = Number(rate);
  }

  if (formObject['rate'] && formObject['email'] && formObject['review']) {
    errorLabel.innerText = '';
    patchRating(formObject);
  } else {
    if (!formObject['rate']) {
      errorLabel.innerText = 'Please give a rating';
    } else if (!formObject['email']) {
      errorLabel.innerText = 'Please fill in your email';
    } else if (!formObject['review']) {
      errorLabel.innerText = 'Please fill in your comment';
    }
  }
}

async function patchRating(data) {
  const url = BASE_URL + currentExerciseId + '/rating';

  try {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      errorLabel.innerText = 'Something went wrong. Please try again';
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    closeRating();
    return responseData;
  } catch (error) {
    errorLabel.innerText = 'Something went wrong. Please try again';
    console.error('Error sending PATCH request:', error.message);
    throw error;
  }
}

function addEventListenersOnRatingForm() {
  giveRating.removeEventListener('click', openRating);
  closeRatingButton.removeEventListener('click', closeRating);
  form.removeEventListener('submit', submitRatingForm);
  radioButtons.forEach(radio => {
    radio.removeEventListener('click', setRatingScore);
  });

  giveRating.addEventListener('click', openRating);
  closeRatingButton.addEventListener('click', closeRating);
  form.addEventListener('submit', submitRatingForm);
  radioButtons.forEach(radio => {
    radio.addEventListener('click', setRatingScore);
  });
}

const fetchExercisesRequest = async id => {
  try {
    const response = await axios.get(BASE_URL + id);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

export async function handleModalWindow(e) {
  if (e.target.matches('[data-modal-open]')) {
    currentExerciseId = e.target.getAttribute('data-modal-open');
    if (currentExerciseId.length) {
      fetchExercises = await fetchExercisesRequest(currentExerciseId);
      if (fetchExercises) {
        addEventListenersOnModal();
        addEventListenersOnRatingForm();
        toggleFromFavorites(fetchExercises['_id']);
        handleAddToFavorites();

        exerciseGif.src = fetchExercises['gifUrl'] || '../images/gif.jpg';
        exerciseName.innerText = fetchExercises['name'] || '';
        const score = Math.round(fetchExercises['rating']);
        const starRatingWidth = score * 20 + 20;
        ratingStars.style.setProperty(
          'width',
          `${starRatingWidth}px`,
          'important'
        );
        ratingScore.innerText = `${score}.0`;

        const targetsInfoObj = {
          target: {
            title: 'Target',
            subtitle: fetchExercises.target,
          },
          bodyPart: {
            title: 'Body Part',
            subtitle: fetchExercises.bodyPart,
          },
          equipment: {
            title: 'Equipment',
            subtitle: fetchExercises.equipment,
          },
          popularity: {
            title: 'Popular',
            subtitle: fetchExercises.popularity,
          },
          burnedCalories: {
            title: 'Burned calories',
            subtitle: `${fetchExercises.burnedCalories}/${fetchExercises.time}`,
          },
        };

        targetsList.innerHTML = Object.keys(targetsInfoObj)
          .map(
            item =>
              `<li class='modal-info-targets-list-item'>
    <div class='modal-info-targets-list-item-container'>
    <p class='modal-info-targets-list-item-container-title'>${targetsInfoObj[item]['title']}</p>
    <p class='modal-info-targets-list-item-container-subtitle'>${targetsInfoObj[item]['subtitle']}</p>
    </div>
  </li>`
          )
          .join('');

        description.innerHTML = `<p>${fetchExercises['description']}</p>`;
        modalWindow.classList.add('is-open');
      }
    }
  }
}
