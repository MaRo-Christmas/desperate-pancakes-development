import icons from '../../images/icons.svg';

const paginationRef = document.getElementById('pagination');

export function createExerciseCard({ _id, name, bodyPart, target, burnedCalories, time, rating }) {
  return (`
    <li class="exr-card fav-exr-card">
      <div class="workout-title">
        <div class="workout-title-left fav-workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
          <p class="workout-rating">${rating}
            <svg class="workout-star" width="18" height="18">
              <use href="${icons}#rating-star"></use>
            </svg>
          </p>
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
        <p class="workout-details-disc">${name}</p>
      </div>
      <div class="workout-stats">
        <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${burnedCalories} / ${time}</p>
        <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${bodyPart}</p>
        <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${target}</p>
      </div>
    </li>
  `)
}

export function createCart({ filter, imgURL, name }) {
  return `<li class='card-item' data-category='${name}'>
      <div class='card-wrapper'>
        <img src=${imgURL} alt='${name}'/>
        <div class='card-overlay'></div>
        <div class='card-text'>
          <h3>${name}</h3>
          <span>${filter}</span>
        </div>
      </div>
    </li>`;
}

export function renderListOfCards(arr, renderFunction, ref) {
  ref.innerHTML = '';
  const list = arr.map((el) => renderFunction(el)).join("");
  ref.insertAdjacentHTML("afterbegin", list);
}

export function renderPagination(number) {
  paginationRef.innerHTML = '';
  const arr = [];
  for (let index = 1; index <= number; index++) {
    const element = `<div class='pagination-item' data-page='${index}'>${index}</div>`;
    arr.push(element)
  }
  paginationRef.insertAdjacentHTML("afterbegin", arr.join(''))
  paginationRef.firstChild.classList.add('active')
}