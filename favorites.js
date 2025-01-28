import{h as w,i as n}from"./assets/scroll-btn-CI5fIfuT.js";import{a as f}from"./assets/vendor-CQpva9gi.js";function c(t){return t&&typeof t=="string"?t.charAt(0).toUpperCase()+t.slice(1):t}async function l(){const t=JSON.parse(localStorage.getItem("favorites"))||[],e=document.getElementById("wrapper-secnd");if(!t||t.length===0){e.innerHTML='<li class="text-exer"><p>It appears that you havent added any exercises to your favorites yet. To get started, you can add exercises that you like to your favorites for easier access in the future.</p></li>';return}const r=async a=>{try{return(await f.get(`https://your-energy.b.goit.study/api/exercises/${a}`)).data}catch(s){return console.error("Error fetching exercise data",s),null}},o=(await Promise.all(t.map(a=>r(a)))).filter(a=>a!==null);if(o.length>0){const a=o.map(({_id:s,name:u,bodyPart:p,target:g,burnedCalories:m,time:v})=>`
     <li class="exr-card fav-exr-card">
           <div class="workout-title">
             <div class="workout-title-left fav-workout-title-left">
               <p class="workout-title-name">WORKOUT</p>
               <svg data-modal="${s}" class="trash-icon" width="16" height="16">
                   <use href="${n}#icon-trash"></use>
               </svg>
             </div>
          <div class="workout-title-right">
           <button aria-label="start-trainig" class="workout-start" data-modal-open="${s}">Start
           <svg class="workout-arw" width="16" height="16">
             <use href="${n}#arw-top"></use>
           </svg>
           </button>
         </div>
           </div>
           <div class="workout-details">
             <p class="workout-run-man-wrapper">
               <svg class="workout-run-man" width="16" height="16">
                 <use href="${n}#runn-man"></use>
               </svg>
             </p>
             <p class="workout-details-disc">${c(u)}</p>
           </div>
           <div class="workout-stats">
             <p class="workout-stats-cal"><span class="workout-stats-title">Burned calories: </span>${m} / ${v}</p>
             <p class="workout-stats-part"><span class="workout-stats-title">Body part: </span>${c(p)}</p>
             <p class="workout-stats-target"><span class="workout-stats-title">Target: </span>${c(g)}</p>
           </div>
         </li>
   `).join("");e.innerHTML=a}else e.innerHTML='<li class="text-exer"><p>Something went wrong. Please try again later.</p></li>'}function d(t){const e=document.querySelector(`.trash-icon[data-modal="${t}"]`).closest(".exr-card");e.classList.add("fade-out"),setTimeout(()=>{const i=(JSON.parse(localStorage.getItem("favorites"))||[]).filter(o=>o!==t);localStorage.setItem("favorites",JSON.stringify(i)),e.remove(),i.length===0&&l()},300)}window.removeExerciseFromFavoritesWithAnimation=d;document.getElementById("wrapper-secnd").addEventListener("click",t=>{const e=t.target.closest(".trash-icon");if(e){const r=e.getAttribute("data-modal");d(r)}});document.addEventListener("DOMContentLoaded",l);document.getElementById("wrapper-secnd").addEventListener("click",async t=>{t.target.closest("[data-modal-open]")&&await w(t)});
//# sourceMappingURL=favorites.js.map
