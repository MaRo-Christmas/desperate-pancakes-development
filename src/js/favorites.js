import icons from '../images/icons.svg';
import axios from 'axios';
import { handleModalWindow } from './modal-window.js';

function capitalizeFirstLetter(str) {
 if (str && typeof str === 'string') {
   return str.charAt(0).toUpperCase() + str.slice(1);
 }
 return str;
}

async function createExerciseCardsFromLocalStorage() {
 const favCards = JSON.parse(localStorage.getItem('favorites')) || [];
 const wrapperSecnd = document.getElementById('wrapper-secnd');

 // Якщо немає улюблених вправ, показуємо повідомлення
 if (!favCards || favCards.length === 0) {
   wrapperSecnd.innerHTML = '<li class="text-exer"><p>It appears that you havent added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p></li>';
   return;
 }

 // Функція для отримання даних вправи за ідентифікатором
 const fetchExerciseData = async (id) => {
   try {
     const response = await axios.get(`https://your-energy.b.goit.study/api/exercises/${id}`);
     return response.data;
   } catch (error) {
     console.error('Error fetching exercise data', error);
     return null;
   }
 };

 // Отримуємо дані для всіх улюблених вправ
 const exercisesData = await Promise.all(favCards.map(id => fetchExerciseData(id)));

 // Фільтруємо в разі помилок при запитах (якщо повернеться null)
 const validExercises = exercisesData.filter(exercise => exercise !== null);

 // Якщо вправи є, рендеримо їх
 if (validExercises.length > 0) {
   const cardsHtml = validExercises.map(({ _id, name, bodyPart, target, burnedCalories, time }) =>
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
 } else {
   wrapperSecnd.innerHTML = '<li class="text-exer"><p>Something went wrong. Please try again later.</p></li>';
 }
}
function removeExerciseFromFavoritesWithAnimation(exerciseId) {
 const cardToDelete = document.querySelector(`.trash-icon[data-modal="${exerciseId}"]`).closest('.exr-card');

 // Додаємо клас для анімації
 cardToDelete.classList.add('fade-out');

 // Видаляємо елемент після завершення анімації
 setTimeout(() => {
   // Видаляємо вправу з localStorage
   let favEx = JSON.parse(localStorage.getItem('favorites')) || [];
  
   // Фільтруємо масив для видалення ID вправи
   const updatedFavorites = favEx.filter(id => id !== exerciseId);
  
   // Оновлюємо localStorage
   localStorage.setItem('favorites', JSON.stringify(updatedFavorites));

   // Видаляємо картку з DOM
   cardToDelete.remove();

   // Якщо карток більше немає, показуємо повідомлення
   if (updatedFavorites.length === 0) {
     createExerciseCardsFromLocalStorage();
   }
 }, 300); 
}

// Обробник подій для видалення вправи
document.getElementById('wrapper-secnd').addEventListener('click', (event) => {
 const trashIcon = event.target.closest('.trash-icon');
 if (trashIcon) {
   const exerciseId = trashIcon.getAttribute('data-modal');
   removeExerciseFromFavoritesWithAnimation(exerciseId);
 }
});


// Викликаємо функцію при завантаженні сторінки
document.addEventListener('DOMContentLoaded', createExerciseCardsFromLocalStorage);


// модальне вікно при натисненні Start

// document.getElementById('wrapper-secnd').addEventListener('click', (event) => {
//  // Знаходимо кнопку "Start" за атрибутом data-modal-open
//   const startButton = event.target.closest('[data-modal-open]');
//   if (startButton) {
//    // Відкриття модального вікна
//    const modalWindow = document.querySelector('.modal-overlay'); // Знаходимо контейнер модального вікна
//    modalWindow.classList.add('is-open'); // Додаємо клас для його відкриття
//  }
// });
document.getElementById('wrapper-secnd').addEventListener('click', async (event) => {
  // Знаходимо кнопку "Start" за атрибутом data-modal-open
  const startButton = event.target.closest('[data-modal-open]');
  
  if (startButton) {
    // Викликаємо функцію handleModalWindow, щоб завантажити дані та відкрити модальне вікно
    await handleModalWindow(event);
  }
});

