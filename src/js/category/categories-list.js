import { getExercisesByFilter, searchExercises } from "../api/getExercises";
import { createExerciseCard, createCart, renderListOfCards, renderPagination } from './render-cards';
import { handleModalWindow } from '../modal-window.js';

export let category = 'Muscles';
export let name;
let isExercisesListDisplay = false;

window.onload = () => {
  consoke.log('Hello, world!!')
  isExercisesListDisplay = false;

  const limit = getLimitForRequest('categories');
  getExercisesByFilter(category, 1, limit).then((result) => {
    renderListOfCards(result.results, createCart, categoriesCardslistRef);
    renderPagination(result.totalPages);
    addEventListenerOnCard()
  })
}

const searchContainer = document.querySelector('.search-container');
const btnsListRef = document.querySelector(".categories-btns-list");
const categoriesCardslistRef = document.querySelector('.categories-cards-list');
const exercisesCardsList = document.querySelector('.exercises-list')
const paginationRef = document.getElementById('pagination');

btnsListRef.addEventListener("click", (e) => handleClickOnFilterBtn(e));
exercisesCardsList.addEventListener('click', (e) => {
    if (e.target.getAttribute('data-modal-open')) {
      handleModalWindow(e);
    }
  }
);
paginationRef.addEventListener("click", (e) => handlePaginationClick(e));

function addEventListenerOnCard() {
  const categoriesCardsRef = document.querySelectorAll(".card-item");
  categoriesCardsRef.forEach(el => el.addEventListener("click", (e) => handleClickOnCard(e)))
}

function handleClickOnFilterBtn(e) {
  const isBtn = e.target.classList.contains("category-btn");
  if (!isBtn) return;

  category = e.target.dataset.action;

  const btnsListAll = document.querySelectorAll(".category-btn");
  btnsListAll.forEach(item => item.classList.remove('active'));
  e.target.classList.add('active');

  categoriesCardslistRef.style.display = "flex";
  searchContainer.style.display = "none";
  exercisesCardsList.style.display = 'none';

  handleTitle();

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
  searchContainer.style.display = "flex";
  exercisesCardsList.style.display = 'flex';

  isExercisesListDisplay = true;
  name = e.currentTarget.dataset.category;

  handleTitle(name)

  const limit = getLimitForRequest('exercises');
  let param = category.replace(/\s/g,'').toLowerCase();
  if(category === 'Body parts') {
    param = param.slice(0, -1)
  }
  searchExercises({[param]: name, limit: limit}).then(result => {
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
    searchExercises({[category.replace(/\s/g,'').toLowerCase()]: name, limit: limit, page: page}).then(result => {
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

function getLimitForRequest(type) {
  let limit;
  if (window.matchMedia('screen and (max-width: 768px)').matches){
    limit = type === 'categories' ? 10 : 8;
  } else {
    limit = type === 'categories'? 12 : 10;
  }
  return limit;
}

function handleTitle(name) {
  const titleRef = document.querySelector('.main-section-title .current-category');
  const slashRef = document.querySelector('.slash');
  if(name) {
    slashRef.style.display = 'inline';
    titleRef.innerHTML = name;
  } else {
    slashRef.style.display = '';
    titleRef.innerHTML = '';
  }
}