import icons from '../images/icons.svg';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Функція для створення карток із localStorage
function createExerciseCardsFromLocalStorage() {
  const favorites = JSON.parse(localStorage.getItem('favorites_ex_key')) || [];
  const wrapperSecnd = document.getElementById('wrapper-secnd');

  // Якщо немає улюблених вправ, показуємо повідомлення
  if (favorites.length === 0) {
    wrapperSecnd.innerHTML = '<li class="text-exer"><p>It appears that you havent added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p></li>';
    return;
  }

  // Якщо вправи є, рендеримо їх
    const cardsHtml = favorites.map(({ _id, name, bodyPart, target, burnedCalories, time }) =>
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
  let favorites = JSON.parse(localStorage.getItem('favorites_ex_key')) || [];

  // Фільтруємо список, видаляючи вправу за ID
  favorites = favorites.filter(exercise => exercise._id !== exerciseId);

  // Оновлюємо список в localStorage
  localStorage.setItem('favorites_ex_key', JSON.stringify(favorites));

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