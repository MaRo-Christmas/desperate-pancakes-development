import { searchExercises } from "./api/getExercises";
import { category, name } from './category/categories-list';
import { createExerciseCard, renderListOfCards, renderPagination } from "./category/render-cards";

// Отримання посилань на елементи
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const loadMoreButton = document.getElementById('loadMoreButton');
const exercisesCardsList = document.querySelector('.exercises-list');
const paginationRef = document.getElementById('pagination');

let currentPage = 1; // Трекер поточної сторінки
let currentQuery = ''; // Зберігання поточного пошукового запиту

// Обробка подій для кнопки пошуку
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query; // Зберегти поточний пошуковий запит
    currentPage = 1; // Скинути до першої сторінки
    searchExercises({[category.replace(/\s/g,'').toLowerCase()]: name, keyword: query}, currentPage).then(result => {
      console.log(result)
      if(result.results.length) {
        renderListOfCards(result.results, createExerciseCard, exercisesCardsList);
        renderPagination(result.totalPages)
      } else {
        exercisesCardsList.innerHTML = '<li>No Results</li>';
        paginationRef.innerHTML = '';
      }
    });
  }
});

// Очищення результатів при очищенні поля пошуку
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = '';
    loadMoreButton.style.display = 'none';
  }
});
