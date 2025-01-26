import axios from "axios";

// Отримання посилань на елементи
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const searchResults = document.getElementById("searchResults");
const defaultCards = document.getElementById("defaultCards");
const loadMoreButton = document.getElementById("loadMoreButton");

let allExercises = []; // Зберігає всі отримані вправи
let currentQuery = ""; // Зберігання поточного пошукового запиту

// Функція для відображення вправ
function displayExercises(exercises) {
  if (exercises.length > 0) {
    searchResults.innerHTML = "";
    exercises.forEach((exercise) => {
      const exerciseItem = document.createElement("li");
      exerciseItem.classList.add("card-item");
      exerciseItem.innerHTML = `
        <strong>${exercise.name || "Unnamed Exercise"}</strong>
        <p>Burned calories: ${exercise.burnedCalories || "N/A"}</p>
        <p>Description: ${exercise.description || "No description available"}</p>
      `;
      searchResults.appendChild(exerciseItem);
    });
    defaultCards.style.display = "none";
    searchResults.style.display = "flex";
  } else {
    searchResults.innerHTML = "<p>No exercises found.</p>";
    searchResults.style.display = "flex";
    defaultCards.style.display = "none";
  }
}

// Функція для локального фільтрування
function filterExercises(query) {
  return allExercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(query.toLowerCase())
  );
}

// Функція для запиту до API
async function fetchAllExercises() {
  const baseURL = "https://your-energy.b.goit.study/api/exercises";
  try {
    const response = await axios.get(baseURL, { params: { limit: 1000 } }); // Отримати всі вправи
    allExercises = response.data?.results || [];
    console.log("Усі вправи:", allExercises);

    // Якщо немає пошукового запиту, показуємо стандартні картки
    if (!searchInput.value.trim()) {
      defaultCards.style.display = "flex";
      searchResults.style.display = "none";
    }
  } catch (error) {
    console.error("Помилка під час запиту:", error);
    searchResults.innerHTML = "<p>Сталася помилка. Спробуйте ще раз.</p>";
    searchResults.style.display = "flex";
    defaultCards.style.display = "none";
  }
}

// Обробка подій для кнопки пошуку
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (query) {
    currentQuery = query;
    const filteredExercises = filterExercises(currentQuery);
    displayExercises(filteredExercises);
  } else {
    defaultCards.style.display = "flex";
    searchResults.style.display = "none";
  }
});

// Натискання Enter для пошуку
searchInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

// Очищення поля пошуку
searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim();
  if (!query) {
    defaultCards.style.display = "flex";
    searchResults.style.display = "none";
  }
});

// Завантаження вправ при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
  fetchAllExercises();
});
