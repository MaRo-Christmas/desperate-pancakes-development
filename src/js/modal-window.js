import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api/exercises/';
let currentExerciseId = null;
let removeFromFavorites = false;

const fetchExercisesRequest = async (id) => {
  try {
    const response = await axios.get(BASE_URL + id);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data', error);
    throw error;
  }
};

const fetchExercises = await fetchExercisesRequest('64f389465ae26083f39b17a2');
console.log(fetchExercises);

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

closeButton.addEventListener('click', () => {
  modalWindow.classList.remove('is-open');
});

modalWindow.addEventListener('click', (event) => {
  console.log(event.target);
  if (event.target === modalWindow) {
    modalWindow.classList.remove('is-open');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    modalWindow.classList.remove('is-open');
  }
});

function toggleFromFavorites() {
  const favorites = JSON.parse(window.localStorage.getItem('favorites'));
  if (favorites && favorites.length && favorites.includes(fetchExercises._id)) {
    removeFromFavorites = true;
    addToFavorites.innerHTML = `Remove from favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='../images/modal-window-sprite.svg#icon-trash'></use>
                        </svg>`;
  } else {
    removeFromFavorites = false;
    addToFavorites.innerHTML = `Add to favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='../images/modal-window-sprite.svg#icon-heart-favorites'></use>
                        </svg>`;
  }
}

toggleFromFavorites();

addToFavorites.addEventListener('click', () => {
  const storage = JSON.parse(window.localStorage.getItem('favorites'));
  if (!storage || !storage.length) {
    window.localStorage.setItem('favorites', JSON.stringify([fetchExercises._id]));
  } else if (!storage.includes(fetchExercises._id)) {
    window.localStorage.setItem('favorites', JSON.stringify([...storage, fetchExercises._id]));
  }
  if (removeFromFavorites) {
    const updatedFavorites = storage.filter((item) => item !== fetchExercises._id);
    window.localStorage.setItem('favorites', JSON.stringify([...updatedFavorites]));
  }
  toggleFromFavorites(JSON.parse(window.localStorage.getItem('favorites')), 'click');
});

exerciseGif.src = fetchExercises['gifUrl'] || '../images/gif.jpg';
exerciseName.innerText = fetchExercises['name'] || '';

const score = Math.round(fetchExercises['rating']);
const starRatingWidth = score * 20 + 20;
ratingStars.style.setProperty('width', `${starRatingWidth}px`, 'important');
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


targetsList.innerHTML = Object.keys(targetsInfoObj).map((item) =>
  `<li class='modal-info-targets-list-item'>
    <div class='modal-info-targets-list-item-container'>
    <p class='modal-info-targets-list-item-container-title'>${targetsInfoObj[item]['title']}</p>
    <p class='modal-info-targets-list-item-container-subtitle'>${targetsInfoObj[item]['subtitle']}</p>
    </div>
  </li>`).join('');

description.innerHTML = `<p>${fetchExercises['description']}</p>`;

// ______________________ADD RATING LOGIC______________________________________________________________

// Елементи модального вікна з рейтингом
const ratingWindow = document.querySelector('.rating');
const form = document.getElementById('userForm');
const closeRatingButton = document.querySelector('.modal-close-rating-button');
const radioButtons = document.querySelectorAll('input[name="custom-radio"]');
const scoreValue = document.querySelector('.modal-rating-block-score-value');
const errorLabel = document.querySelector('.modal-error-label-text');
let rate;
giveRating.addEventListener('click', () => {
  exercisesWindow.classList.add('hide-window');
  setTimeout(() => {
    ratingWindow.classList.remove('hide-window');
  }, 150);
});

function closeRating() {
  ratingWindow.classList.add('hide-window');
  setTimeout(() => {
    exercisesWindow.classList.remove('hide-window');
  }, 150);
}

closeRatingButton.addEventListener('click', () => {
  closeRating();
});

radioButtons.forEach((radio) => {
  radio.addEventListener('change', (event) => {
    rate = event.target.value;
    scoreValue.innerText = `${rate}.0`;
    radioButtons.forEach((star) => {
      if (Number(star.value) <= Number(rate)) {
        star.classList.add('checked-rating');
      } else {
        star.classList.remove('checked-rating');
      }
    });
  });
});

async function patchRating(data) {
  const url = BASE_URL + '64f389465ae26083f39b17a2' + '/rating';

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
    console.log('Success:', responseData);
    return responseData;
  } catch (error) {
    errorLabel.innerText = 'Something went wrong. Please try again';
    console.error('Error sending PATCH request:', error.message);
    throw error;
  }
}

form.addEventListener('submit', function(event) {
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
});


