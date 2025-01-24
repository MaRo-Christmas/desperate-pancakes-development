

// Усі коментарі залишив тільки для правильного усвідомлення що за що відповідає
// Коли будемо мержати усі коменти можна буде видалити

import axios from 'axios';

// Отримання посилань на елементи
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');
const loadMoreButton = document.getElementById('loadMoreButton');

let currentPage = 1; // Трекер поточної сторінки
let currentQuery = ''; // Зберігання поточного пошукового запиту

// Функція для запиту до API
async function searchExercises(query, page = 1) {
  const baseURL = 'https://your-energy.b.goit.study/api/exercises';
  try {
    const response = await axios.get(baseURL, {
      params: { filter: query, limit: 10, page },
    });

    // Якщо це перша сторінка, очистіть результати
    if (page === 1) {
      searchResults.innerHTML = '';
    }

    // Перевірка результатів
    if (response.data && response.data.results && response.data.results.length > 0) {
      response.data.results.forEach((exercise) => {
        const exerciseItem = document.createElement('div');
        exerciseItem.classList.add('exercise-item');
        exerciseItem.innerHTML = `
          <strong>${exercise.name || 'Unnamed Exercise'}</strong>
          <p>Burned calories: ${exercise.burnedCalories || 'N/A'}</p>
          <p>Description: ${exercise.description || 'No description available'}</p>
        `;
        searchResults.appendChild(exerciseItem);
      });

      // Перевірка, чи є ще результати
      if (response.data.results.length === 10) {
        loadMoreButton.style.display = 'block'; // Показати кнопку "Load More"
      } else {
        loadMoreButton.style.display = 'none'; // Приховати, якщо більше сторінок немає
      }
    } else {
      if (page === 1) {
        searchResults.textContent = 'No exercises found.';
      }
      loadMoreButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error fetching exercises:', error);
    searchResults.textContent = 'An error occurred. Please try again.';
    loadMoreButton.style.display = 'none';
  }
}

// Обробка подій для кнопки пошуку
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query; // Зберегти поточний пошуковий запит
    currentPage = 1; // Скинути до першої сторінки
    searchExercises(query, currentPage);
  }
});

// Обробка подій для кнопки "Load More"
loadMoreButton.addEventListener('click', () => {
  currentPage += 1; // Перейти на наступну сторінку
  searchExercises(currentQuery, currentPage);
});

// Очищення результатів при очищенні поля пошуку
searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  if (!query) {
    searchResults.innerHTML = '';
    loadMoreButton.style.display = 'none';
  }
});
