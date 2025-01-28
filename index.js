import{i as h,h as S}from"./assets/scroll-btn-CASHhAMA.js";import{a as m,i as n}from"./assets/vendor-CQpva9gi.js";document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname;document.querySelectorAll(".menu-item .menu-link").forEach(e=>{e.closest(".menu-item").classList.toggle("active",t.endsWith(e.getAttribute("href").substring(1)))})});m.defaults.baseURL="https://your-energy.b.goit.study/api/";async function f(t,e,s){try{const r={filter:t,page:e,limit:s};return(await m.get("filters",{params:r})).data}catch{n.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}async function w(t){try{return(await m.get("exercises",{params:t})).data}catch{n.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}const y=document.getElementById("pagination");function v({_id:t,name:e,bodyPart:s,target:r,burnedCalories:a,time:c,rating:B}){return`
    <li class="exr-card fav-exr-card">
      <div class="workout-title">
        <div class="workout-title-left fav-workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
          <p class="workout-rating">${B}
            <svg class="workout-star" width="18" height="18">
              <use href="${h}#rating-star"></use>
            </svg>
          </p>
        </div>
        <div class="workout-title-right">
          <button aria-label="start-trainig" class="workout-start" data-modal-open="${t}">Start
            <svg class="workout-arw" width="16" height="16">
              <use href="${h}#arw-top"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="workout-details">
        <p class="workout-run-man-wrapper">
          <svg class="workout-run-man" width="16" height="16">
            <use href="${h}#runn-man"></use>
          </svg>
        </p>
        <p class="workout-details-disc">${e}</p>
      </div>
      <div class="workout-stats">
        <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${a} / ${c}</p>
        <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${s}</p>
        <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${r}</p>
      </div>
    </li>
  `}function L({filter:t,imgURL:e,name:s}){return`<li class='card-item' data-category='${s}'>
      <div class='card-wrapper'>
        <img src=${e} alt='${s}'/>
        <div class='card-overlay'></div>
        <div class='card-text'>
          <h3>${s}</h3>
          <span>${t}</span>
        </div>
      </div>
    </li>`}function o(t,e,s){s.innerHTML="";const r=t.map(a=>e(a)).join("");s.insertAdjacentHTML("afterbegin",r)}function p(t){y.innerHTML="";const e=[];for(let s=1;s<=t;s++){const r=`<div class='pagination-item' data-page='${s}'>${s}</div>`;e.push(r)}y.insertAdjacentHTML("afterbegin",e.join("")),y.firstChild.classList.add("active")}let i="Muscles",l,k=!1;window.onload=()=>{k=!1;const t=g("categories");f(i,1,t).then(e=>{o(e.results,L,d),p(e.totalPages),E()})};const b=document.querySelector(".search-container"),R=document.querySelector(".categories-btns-list"),d=document.querySelector(".categories-cards-list"),u=document.querySelector(".exercises-list"),T=document.getElementById("pagination");R.addEventListener("click",t=>q(t));u.addEventListener("click",t=>S(t));T.addEventListener("click",t=>P(t));function E(){document.querySelectorAll(".card-item").forEach(e=>e.addEventListener("click",s=>M(s)))}function q(t){if(!t.target.classList.contains("category-btn"))return;i=t.target.dataset.action,document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),d.style.display="flex",b.style.display="none",u.style.display="none",$();const r=g("categories");f(i,1,r).then(a=>{o(a.results,L,d),p(a.totalPages),E()})}function M(t){if(!t.currentTarget.classList.contains("card-item"))return;d.style.display="none",b.style.display="flex",u.style.display="flex",k=!0,l=t.currentTarget.dataset.category,$(l);const s=g("exercises");let r=i.replace(/\s/g,"").toLowerCase();i==="Body parts"&&(r=r.slice(0,-1)),w({[r]:l,limit:s}).then(a=>{o(a.results,v,u),p(a.totalPages)})}function P(t){if(!t.target.classList.contains("pagination-item"))return;const s=t.target.dataset.page;if(document.querySelectorAll(".pagination-item").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),k){const a=g("exercises");w({[i.replace(/\s/g,"").toLowerCase()]:l,limit:a,page:s}).then(c=>{o(c.results,v,u)})}else{const a=g("categories");f(i,s,a).then(c=>{o(c.results,L,d),E()})}}function g(t){let e;return window.matchMedia("screen and (max-width: 768px)").matches?e=t==="categories"?10:8:e=t==="categories"?12:10,e}function $(t){const e=document.querySelector(".main-section-title .current-category"),s=document.querySelector(".slash");t?(s.style.display="inline",e.innerHTML=t):(s.style.display="",e.innerHTML="")}const C=document.getElementById("searchInput"),A=document.getElementById("searchButton");document.getElementById("searchResults");document.getElementById("loadMoreButton");const x=document.querySelector(".exercises-list"),I=document.getElementById("pagination");A.addEventListener("click",()=>{const t=C.value.trim();if(t){let e=i.replace(/\s/g,"").toLowerCase();i==="Body parts"&&(e=e.slice(0,-1)),w({[e]:l,keyword:t}).then(s=>{console.log(s),s.results.length?(o(s.results,v,x),p(s.totalPages)):(x.innerHTML='<li class="text-exer"><p>No Results</p></li>',I.innerHTML="")}).catch(s=>{iziToast.error({title:"Error",message:"Something went wrong! Please try again later!"})})}C.value=""});const H={baseURL:"https://your-energy.b.goit.study/api",timeout:1e4,headers:{"Content-Type":"application/json"}},O=async t=>await m.create(H).post("/subscription",{email:t}),F=(t,e)=>{n.success({title:t,message:e})},j=async t=>{t.preventDefault();const e=t.target.elements.email.value;if(e)try{await O(e).then(s=>{F("Success",s.data.message),t.target.reset()}).catch(s=>{n.error({title:"Error",message:s.response.data.message})})}catch{n.error({title:"Error",message:"Failed to process subscription. Please try again."})}else n.warning({title:"Warning",message:"Please provide a valid email address."})};document.addEventListener("DOMContentLoaded",()=>{const t=document.querySelector(".footer-form");t&&t.addEventListener("submit",j)});console.log("Hello, world!");
//# sourceMappingURL=index.js.map
