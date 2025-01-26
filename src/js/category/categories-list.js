import { getExercisesByFilter, searchExercises } from "../api/getExercises";
import { createExerciseCard } from './exercises-list';

let category = 'Muscles';
let name;
let isExercisesListDisplay = false;

window.onload = () => {
  isExercisesListDisplay = false;
  const limit = getLimitForRequest('categories');
  getExercisesByFilter(category, 1, limit).then((result) => {
    renderListOfCards(result.results, createCart, categoriesCardslistRef);
    renderPagination(result.totalPages);
    addEventListenerOnCard()
  })
}

const btnsListRef = document.querySelector(".categories-btns-list");
const categoriesCardslistRef = document.querySelector('.categories-cards-list');
const exercisesCardsList = document.querySelector('.exercises-list')
const paginationRef = document.getElementById('pagination');


btnsListRef.addEventListener("click", (e) => handleClickOnFilterBtn(e));
paginationRef.addEventListener("click", (e) => handlePaginationClick(e));

function handleClickOnFilterBtn(e) {
  const isBtn = e.target.classList.contains("category-btn");
  if (!isBtn) return;
  
  category = e.target.dataset.action;

  const btnsListAll = document.querySelectorAll(".category-btn");
  btnsListAll.forEach(item => item.classList.remove('active'));
  e.target.classList.add('active')

  const limit = getLimitForRequest('categories');
  getExercisesByFilter(category, 1, limit).then((result) => {
    renderListOfCards(result.results, createCart, categoriesCardslistRef);
    renderPagination(result.totalPages);
    addEventListenerOnCard()
  });
}

function handleClickOnCard(e) {
  const isCard = e.currentTarget.classList.contains("card-item");
  if (!isCard) return;

  categoriesCardslistRef.style.display = "none";
  isExercisesListDisplay = true;
  name = e.currentTarget.dataset.category;

  const limit = getLimitForRequest('exercises');
  searchExercises({[category.toLowerCase()]: name, limit: limit}).then(result => {
    console.log(result)
    renderListOfCards(result.results, createExerciseCard, exercisesCardsList);
    renderPagination(result.totalPages);
  })
}

function handlePaginationClick(e) {
  const isBtn = e.target.classList.contains("pagination-item");
  if (!isBtn) return;

  const page = e.target.dataset.page;
  const paginationAll = document.querySelectorAll('.pagination-item');
  paginationAll.forEach(item => item.classList.remove('active'));
  e.target.classList.add('active')

  if(isExercisesListDisplay) {
    const limit = getLimitForRequest('exercises');
    searchExercises({[category.toLowerCase()]: name, limit: limit, page: page}).then(result => {
      console.log(result)
      renderListOfCards(result.results, createExerciseCard, exercisesCardsList);
      
    })
  } else {
    const limit = getLimitForRequest('categories');
    getExercisesByFilter(category, page, limit).then((result) => {
      renderListOfCards(result.results, createCart, categoriesCardslistRef);
      addEventListenerOnCard()
    });
  }
}

function createCart({ filter, imgURL, name }) {
  return `<li class='card-item' data-category=${name}>
      <div class='card-wrapper'>
        <img src=${imgURL} alt=${name}/>
        <div class='card-overlay'></div>
        <div class='card-text'>
          <h3>${name}</h3>
          <span>${filter}</span>
        </div>
      </div>
    </li>`;
}

function renderListOfCards(arr, renderFunction, ref) {
  ref.innerHTML = '';
  const list = arr.map((el) => renderFunction(el)).join("");
  ref.insertAdjacentHTML("afterbegin", list);
}

function renderPagination(number) {
  paginationRef.innerHTML = '';
  const arr = [];
  for (let index = 1; index <= number; index++) {
    const element = `<div class='pagination-item' data-page='${index}'>${index}</div>`;
    arr.push(element)
  }
  paginationRef.insertAdjacentHTML("afterbegin", arr.join(''))
  paginationRef.firstChild.classList.add('active')
}

function addEventListenerOnCard() {
  const categoriesCardsRef = document.querySelectorAll(".card-item");
  categoriesCardsRef.forEach(el => el.addEventListener("click", (e) => handleClickOnCard(e)))
}

function getLimitForRequest(type) {
  let limit;
  if (window.matchMedia('screen and (max-width: 768px)').matches){
    limit = type === 'categories' ? 10 : 8;
  } else {
    limit = type === 'categories'? 12 : 10;
  }
  return limit;
}