import icons from '../../images/icons.svg';

export function createExerciseCard({ _id, name, bodyPart, target, burnedCalories, time }) {
  return (`
    <li class="exr-card fav-exr-card">
      <div class="workout-title">
        <div class="workout-title-left fav-workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
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