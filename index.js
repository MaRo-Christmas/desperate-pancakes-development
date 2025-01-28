import{i as h,h as $}from"./assets/scroll-btn-CvYVeEwq.js";import{a as p,i as n}from"./assets/vendor-CQpva9gi.js";document.addEventListener("DOMContentLoaded",()=>{const t=window.location.pathname;document.querySelectorAll(".menu-item .menu-link").forEach(e=>{e.closest(".menu-item").classList.toggle("active",t.endsWith(e.getAttribute("href").substring(1)))})});p.defaults.baseURL="https://your-energy.b.goit.study/api/";async function f(t,e,s){try{const r={filter:t,page:e,limit:s};return(await p.get("filters",{params:r})).data}catch{n.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}async function w(t){try{return(await p.get("exercises",{params:t})).data}catch{n.error({title:"Error",message:"Something went wrong! Please try again later!",position:"topRight",timeout:4e3})}}const y=document.getElementById("pagination");function v({_id:t,name:e,bodyPart:s,target:r,burnedCalories:a,time:c,rating:S}){return`
    <li class="exr-card fav-exr-card">
      <div class="workout-title">
        <div class="workout-title-left fav-workout-title-left">
          <p class="workout-title-name">WORKOUT</p>
          <p class="workout-rating">${S}
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
    </li>`}function o(t,e,s){s.innerHTML="";const r=t.map(a=>e(a)).join("");s.insertAdjacentHTML("afterbegin",r)}function m(t){y.innerHTML="";const e=[];for(let s=1;s<=t;s++){const r=`<div class='pagination-item' data-page='${s}'>${s}</div>`;e.push(r)}y.insertAdjacentHTML("afterbegin",e.join("")),y.firstChild.classList.add("active")}let i="Muscles",l,b=!1;window.onload=()=>{b=!1;const t=g("categories");f(i,1,t).then(e=>{o(e.results,L,d),m(e.totalPages),k()})};const x=document.querySelector(".search-container"),T=document.querySelector(".categories-btns-list"),d=document.querySelector(".categories-cards-list"),u=document.querySelector(".exercises-list"),R=document.getElementById("pagination");T.addEventListener("click",t=>q(t));u.addEventListener("click",t=>$(t));R.addEventListener("click",t=>I(t));function k(){document.querySelectorAll(".card-item").forEach(e=>e.addEventListener("click",s=>M(s)))}function q(t){if(!t.target.classList.contains("category-btn"))return;i=t.target.dataset.action,document.querySelectorAll(".category-btn").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),d.style.display="flex",x.style.display="none",u.style.display="none",B();const r=g("categories");f(i,1,r).then(a=>{o(a.results,L,d),m(a.totalPages),k()})}function M(t){if(!t.currentTarget.classList.contains("card-item"))return;d.style.display="none",x.style.display="flex",u.style.display="flex",b=!0,l=t.currentTarget.dataset.category,B(l);const s=g("exercises");let r=i.replace(/\s/g,"").toLowerCase();i==="Body parts"&&(r=r.slice(0,-1)),w({[r]:l,limit:s}).then(a=>{o(a.results,v,u),m(a.totalPages)})}function I(t){if(!t.target.classList.contains("pagination-item"))return;const s=t.target.dataset.page;if(document.querySelectorAll(".pagination-item").forEach(a=>a.classList.remove("active")),t.target.classList.add("active"),b){const a=g("exercises");w({[i.replace(/\s/g,"").toLowerCase()]:l,limit:a,page:s}).then(c=>{o(c.results,v,u)})}else{const a=g("categories");f(i,s,a).then(c=>{o(c.results,L,d),k()})}}function g(t){let e;return window.matchMedia("screen and (max-width: 768px)").matches?e=t==="categories"?10:8:e=t==="categories"?12:10,e}function B(t){const e=document.querySelector(".main-section-title .current-category"),s=document.querySelector(".slash");t?(s.style.display="inline",e.innerHTML=t):(s.style.display="",e.innerHTML="")}const C=document.getElementById("searchInput"),P=document.getElementById("searchButton");document.getElementById("searchResults");document.getElementById("loadMoreButton");const E=document.querySelector(".exercises-list"),A=document.getElementById("pagination");P.addEventListener("click",()=>{const t=C.value.trim();if(t){let e=i.replace(/\s/g,"").toLowerCase();i==="Body parts"&&(e=e.slice(0,-1)),w({[e]:l,keyword:t}).then(s=>{console.log(s),s.results.length?(o(s.results,v,E),m(s.totalPages)):(E.innerHTML='<li class="text-exer"><p>No Results</p></li>',A.innerHTML="")}).catch(s=>{iziToast.error({title:"Error",message:"Something went wrong! Please try again later!"})})}C.value=""});const O={baseURL:"https://your-energy.b.goit.study/api",timeout:1e4,headers:{"Content-Type":"application/json"}},H=async t=>await p.create(O).post("/subscription",{email:t}),F=()=>{n.settings({theme:"light",timeout:4e3,resetOnHover:!0,position:"bottomLeft",transitionIn:"flipInX",transitionOut:"flipOutX",progressBar:!0,progressBarColor:"rgba(252, 0, 0, 0.2)",backgroundColor:"rgba(240, 240, 240, 0.4)",titleColor:"rgba(0, 0, 0, 0.2)",messageColor:"rgba(252, 0, 0, 0.6)"})},j=(t,e)=>{n.success({title:t,message:e})},D=async t=>{t.preventDefault();const e=t.target.elements.email.value;if(e)try{await H(e),j("Success","You`ve subscribed successfully!"),t.target.reset()}catch(s){n.error({title:"Error",message:"Failed to process subscription. Please try again."}),console.error("Subscription error:",s)}else n.warning({title:"Warning",message:"Please provide a valid email address."})};document.addEventListener("DOMContentLoaded",()=>{F();const t=document.querySelector(".footer-form");t&&t.addEventListener("submit",D)});console.log("Hello, world!");
//# sourceMappingURL=index.js.map
