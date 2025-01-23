import { getExercises } from "../api/getExercises";

const btnsListRef = document.querySelector(".categories-btns-list");
btnsListRef.addEventListener("click", (e) => handleClick(e));
const listRef = document.querySelector(".categories-cards-list");

function handleClick(e) {
  const isBtn = e.target.classList.contains("category-btn");
  if (!isBtn) return;

  getExercises(e.target.dataset.action).then((result) => {
    renderListOfCards(result.results);
  });
}

function createCart({ filter, imgURL, name }) {
  return `<li class='card-item'>
      <div class='card-wrapper'>
        <img src=${imgURL} alt=${name}/>
        <div class='card-text'>
          <h3>${name}</h3>
          <span>${filter}</span>
        </div>
      </div>
    </li>`;
}

function renderListOfCards(arr) {
  const list = arr.map((el) => createCart(el)).join("");
  listRef.insertAdjacentHTML("afterbegin", list);
}