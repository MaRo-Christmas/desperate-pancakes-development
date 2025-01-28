import{i as f,h as $}from"./assets/modal-window-DSodnrjh.js";import{a as m,i}from"./assets/vendor-CQpva9gi.js";document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname;document.querySelectorAll(".menu-item .menu-link").forEach(e=>{e.closest(".menu-item").classList.toggle("active",t.endsWith(e.getAttribute("href").substring(1)))})});m.defaults.baseURL="https://your-energy.b.goit.study/api/";async function w(t,e,s){try{const r={filter:t,page:e,limit:s};return(await m.get("filters",{params:r})).data}catch{i.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}async function v(t){try{return(await m.get("exercises",{params:t})).data}catch{i.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}const y=document.getElementById("pagination");function L({_id:t,name:e,bodyPart:s,target:r,burnedCalories:a,time:c,rating:T}){return`
    <li class="exr-card fav-exr-card">
      <div class="workout-title">
        <div class="workout-title-left fav-workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
          <p class="workout-rating">${T}
            <svg class="workout-star" width="18" height="18">
              <use href="${f}#rating-star"></use>
            </svg>
          </p>
        </div>
        <div class="workout-title-right">
          <button aria-label="start-trainig" class="workout-start" data-modal-open="${t}">Start
            <svg class="workout-arw" width="16" height="16">
              <use href="${f}#arw-top"></use>
            </svg>
          </button>
        </div>
      </div>
      <div class="workout-details">
        <p class="workout-run-man-wrapper">
          <svg class="workout-run-man" width="16" height="16">
            <use href="${f}#runn-man"></use>
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
  `}function b({filter:t,imgURL:e,name:s}){return`<li class='card-item' data-category='${s}'>
      <div class='card-wrapper'>
        <img src=${e} alt='${s}'/>
        <div class='card-overlay'></div>
        <div class='card-text'>
          <h3>${s}</h3>
          <span>${t}</span>
        </div>
      </div>
    </li>`}function n(t,e,s){s.innerHTML="";const r=t.map(a=>e(a)).join("");s.insertAdjacentHTML("afterbegin",r)}function h(t){y.innerHTML="";const e=[];for(let s=1;s<=t;s++){const r=`<div class='pagination-item' data-page='${s}'>${s}</div>`;e.push(r)}y.insertAdjacentHTML("afterbegin",e.join("")),y.firstChild.classList.add("active")}let o="Muscles",l,k=!1;window.onload=()=>{k=!1;const t=g("categories");w(o,1,t).then(e=>{n(e.results,b,d),h(e.totalPages),E()})};const x=document.querySelector(".search-container"),R=document.querySelector(".categories-btns-list"),d=document.querySelector(".categories-cards-list"),u=document.querySelector(".exercises-list"),q=document.getElementById("pagination");R.addEventListener("click",t=>M(t));u.addEventListener("click",t=>$(t));q.addEventListener("click",t=>P(t));function E(){document.querySelectorAll(".card-item").forEach(e=>e.addEventListener("click",s=>I(s)))}function M(t){if(!t.target.classList.contains("category-btn"))return;o=t.target.dataset.action,document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),d.style.display="flex",x.style.display="none",u.style.display="none",B();const r=g("categories");w(o,1,r).then(a=>{n(a.results,b,d),h(a.totalPages),E()})}function I(t){if(!t.currentTarget.classList.contains("card-item"))return;d.style.display="none",x.style.display="flex",u.style.display="flex",k=!0,l=t.currentTarget.dataset.category,B(l);const s=g("exercises");let r=o.replace(/\s/g,"").toLowerCase();o==="Body parts"&&(r=r.slice(0,-1)),v({[r]:l,limit:s}).then(a=>{n(a.results,L,u),h(a.totalPages)})}function P(t){if(!t.target.classList.contains("pagination-item"))return;const s=t.target.dataset.page;if(document.querySelectorAll(".pagination-item").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),k){const a=g("exercises");v({[o.replace(/\s/g,"").toLowerCase()]:l,limit:a,page:s}).then(c=>{n(c.results,L,u)})}else{const a=g("categories");w(o,s,a).then(c=>{n(c.results,b,d),E()})}}function g(t){let e;return window.matchMedia("screen and (max-width: 768px)").matches?e=t==="categories"?10:8:e=t==="categories"?12:10,e}function B(t){const e=document.querySelector(".main-section-title .current-category"),s=document.querySelector(".slash");t?(s.style.display="inline",e.innerHTML=t):(s.style.display="",e.innerHTML="")}const C=document.getElementById("searchInput"),A=document.getElementById("searchButton");document.getElementById("searchResults");document.getElementById("loadMoreButton");const S=document.querySelector(".exercises-list"),O=document.getElementById("pagination");A.addEventListener("click",()=>{const t=C.value.trim();if(t){let e=o.replace(/\s/g,"").toLowerCase();o==="Body parts"&&(e=e.slice(0,-1)),v({[e]:l,keyword:t}).then(s=>{console.log(s),s.results.length?(n(s.results,L,S),h(s.totalPages)):(S.innerHTML='<li class="text-exer"><p>No Results</p></li>',O.innerHTML="")}).catch(s=>{iziToast.error({title:"Error",message:"Something went wrong! Please try again later!"})})}C.value=""});function H(){window.scrollTo({top:0,behavior:"smooth"})}const p=document.querySelector(".scroll-to-top");p?(window.addEventListener("scroll",()=>{window.scrollY>200?p.classList.add("show"):p.classList.remove("show")}),p.addEventListener("click",H)):console.error("Scroll-to-top button not found.");const F={baseURL:"https://your-energy.b.goit.study/api",timeout:1e4,headers:{"Content-Type":"application/json"}},j=async t=>await m.create(F).post("/subscription",{email:t}),D=()=>{i.settings({theme:"light",timeout:4e3,resetOnHover:!0,position:"bottomLeft",transitionIn:"flipInX",transitionOut:"flipOutX",progressBar:!0,progressBarColor:"rgba(252, 0, 0, 0.2)",backgroundColor:"rgba(240, 240, 240, 0.4)",titleColor:"rgba(0, 0, 0, 0.2)",messageColor:"rgba(252, 0, 0, 0.6)"})},W=(t,e)=>{i.success({title:t,message:e})},U=async t=>{t.preventDefault();const e=t.target.elements.email.value;if(e)try{await j(e),W("Success","You`ve subscribed successfully!"),t.target.reset()}catch(s){i.error({title:"Error",message:"Failed to process subscription. Please try again."}),console.error("Subscription error:",s)}else i.warning({title:"Warning",message:"Please provide a valid email address."})};document.addEventListener("DOMContentLoaded",()=>{D();const t=document.querySelector(".footer-form");t&&t.addEventListener("submit",U)});console.log("Hello, world!");
//# sourceMappingURL=index.js.map
