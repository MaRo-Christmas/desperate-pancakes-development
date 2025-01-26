import axios from "axios";

axios.defaults.baseURL = 'https://your-energy.b.goit.study/api/'

export async function getExercisesByFilter(filter, page, limit) {
  const params = {
    filter,
    page,
    limit,
  };
  const result = await axios.get('filters', {params})
  return result.data;
}

export async function searchExercises(params, page = 1) {
  // const baseURL = 'https://your-energy.b.goit.study/api/exercises';
  console.log(params)
  try {
    const response = await axios.get('exercises', {params});

    return response.data;

    // Якщо це перша сторінка, очистіть результати
    // if (page === 1) {
    //   searchResults.innerHTML = '';
    // }

    // Перевірка результатів
    // if (response.data && response.data.results && response.data.results.length > 0) {
    //   response.data.results.forEach((exercise) => {
    //     const exerciseItem = document.createElement('div');
    //     exerciseItem.classList.add('exercise-item');
    //     exerciseItem.innerHTML = `
    //       <strong>${exercise.name || 'Unnamed Exercise'}</strong>
    //       <p>Burned calories: ${exercise.burnedCalories || 'N/A'}</p>
    //       <p>Description: ${exercise.description || 'No description available'}</p>
    //     `;
    //     searchResults.appendChild(exerciseItem);
    //   });

    //   // Перевірка, чи є ще результати
    //   if (response.data.results.length === 10) {
    //     loadMoreButton.style.display = 'block'; // Показати кнопку "Load More"
    //   } else {
    //     loadMoreButton.style.display = 'none'; // Приховати, якщо більше сторінок немає
    //   }
    // } else {
    //   if (page === 1) {
    //     searchResults.textContent = 'No exercises found.';
    //   }
    //   loadMoreButton.style.display = 'none';
    // }
  } catch (error) {
    console.error('Error fetching exercises:', error);
    // searchResults.textContent = 'An error occurred. Please try again.';
    // loadMoreButton.style.display = 'none';
  }
}