import icons from '../images/icons.svg';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Функція для створення карток із localStorage
function createExerciseCardsFromLocalStorage() {
  const favCards = JSON.parse(localStorage.getItem('favorites')) || [];
  const wrapperSecnd = document.getElementById('wrapper-secnd');

  // Якщо немає улюблених вправ, показуємо повідомлення
  if (!favCards || favCards.length === 0) {
    wrapperSecnd.innerHTML = '<li class="text-exer"><p>It appears that you havent added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p></li>';
    return;
  }

  // Якщо вправи є, рендеримо їх
    const cardsHtml = favCards.map(({ _id, name, bodyPart, target, burnedCalories, time }) =>
    `
    <li class="exr-card fav-exr-card">
          <div class="workout-title">
            <div class="workout-title-left fav-workout-title-left">
              <p class="workout-title-name">WORKOUT</p>
              <svg data-modal="${_id}" class="trash-icon" width="16" height="16">
                  <use href="${icons}#icon-trash"></use>
              </svg>
            </div>
         <div class="workout-title-right">
          <button aria-label="start-trainig" class="workout-start" data-modal-open="${_id}">Start
          <svg class="workout-arw" width="16" height="16">
            <use href="${icons}#arw-top"></use>
          </svg>
          </button>
        </div>
          </div>
          <div class="workout-details">
            <p class="workout-run-man-wrapper">
              <svg class="workout-run-man" width="16" height="16">
                <use href="${icons}#runn-man"></use>
              </svg>
            </p>
            <p class="workout-details-disc">${capitalizeFirstLetter(name)}</p>
          </div>
          <div class="workout-stats">
            <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${burnedCalories} / ${time}</p>
            <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${capitalizeFirstLetter(bodyPart)}</p>
            <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${capitalizeFirstLetter(target)}</p>
          </div>
        </li>
  `).join('');

  // Вставляємо HTML карток у контейнер
  wrapperSecnd.innerHTML = cardsHtml;
}

// Функція для видалення вправи з localStorage
function removeExerciseFromFavorites(exerciseId) {
  // Отримуємо поточний список вправ із localStorage
  let favEx = JSON.parse(localStorage.getItem('favorites')) || [];

  // Фільтруємо список, видаляючи вправу за ID
  const favorites = favEx.filter(exercise => exercise._id !== exerciseId);

  // Оновлюємо список в localStorage
  localStorage.setItem('favorites', JSON.stringify(favorites));

  // Перерендеримо список вправ
  createExerciseCardsFromLocalStorage();
}

// Обробник подій для видалення вправи
document.getElementById('wrapper-secnd').addEventListener('click', (event) => {
    // Перевіряємо, чи клікнув користувач по іконці "trash"
    const trashIcon = event.target.closest('.trash-icon');
    if (trashIcon) {
        const exerciseId = trashIcon.getAttribute('data-modal'); // Отримуємо ID вправи
        removeExerciseFromFavorites(exerciseId); // Видаляємо вправу
    }
});
// Викликаємо функцію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', createExerciseCardsFromLocalStorage);

// модальне вікно при натисненні Start додати файл!

// приклад для роботи зі сховищем

const apiData = [
  {
    "_id": "64f389465ae26083f39b17a4",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0003.gif",
    "name": "air bike",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3,
    "burnedCalories": 312,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a5",
    "bodyPart": "waist",
    "equipment": "body weight",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0006.gif",
    "name": "alternate heel touchers",
    "target": "abs",
    "description": "This refers to your core muscles, which include the rectus abdominis, obliques, and transverse abdominis. They're essential for maintaining posture, stability, and generating force in many movements. Exercises that target the abs include crunches, leg raises, and planks.",
    "rating": 3,
    "burnedCalories": 116,
    "time": 3,
    "popularity": 1
  },
  {
    "_id": "64f389465ae26083f39b17a6",
    "bodyPart": "back",
    "equipment": "cable",
    "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0007.gif",
    "name": "alternate lateral pulldown",
    "target": "lats",
    "description": "These large back muscles are responsible for shoulder adduction and horizontal extension. Pull-ups and lat pulldowns are common exercises targeting the lats.",
    "rating": 3,
    "burnedCalories": 70,
    "time": 3,
    "popularity": 1
  }
];

// Збереження у локальне сховище
localStorage.setItem('favorites', JSON.stringify(apiData));

// Перевірка
console.log('Data saved to localStorage:', JSON.parse(localStorage.getItem('favorites')));