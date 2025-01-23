// import Pagination from 'tui-pagination';
// import 'tui-pagination/dist/tui-pagination.css';

import { getExercises } from "../api/getExercises";
let category = 'Muscles';

window.onload = () => {
  getExercises(category, 1, 10).then((result) => {
    renderListOfCards(result.results);
    renderPagination(result.totalPages);
  })
}

const btnsListRef = document.querySelector(".categories-btns-list");
const listRef = document.querySelector(".categories-cards-list");
const paginationRef = document.getElementById('pagination');


btnsListRef.addEventListener("click", (e) => handleClick(e));
paginationRef.addEventListener("click", (e) => handlePaginationClick(e));

function handleClick(e) {
  const isBtn = e.target.classList.contains("category-btn");
  if (!isBtn) return;
  
  category = e.target.dataset.action;

  getExercises(category, 1, 10).then((result) => {
    renderListOfCards(result.results);
    renderPagination(result.totalPages);
  });
}

function handlePaginationClick(e) {
  const isBtn = e.target.classList.contains("pagination-item");
  if (!isBtn) return;

  const page = e.target.dataset.page;
  const paginationAll = document.querySelectorAll('.pagination-item');
  paginationAll.forEach(item => item.classList.remove('active'));
  e.target.classList.add('active')

  getExercises(category, page, 10).then((result) => {
    renderListOfCards(result.results);
  });
}

function createCart({ filter, imgURL, name }) {
  return `<li class='card-item'>
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

function renderListOfCards(arr) {
  listRef.innerHTML = '';
  const list = arr.map((el) => createCart(el)).join("");
  listRef.insertAdjacentHTML("afterbegin", list);
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



// paginationAll.forEach(link => {
//   link.addEventListener('click', function (e) {
//     // e.preventDefault(); // Prevent default link behavior

//     // Remove 'active' class from all links
//     paginationAll.forEach(link => link.classList.remove('active'));

//     // Add 'active' class to the clicked link
//     this.classList.add('active');
//   });
// });