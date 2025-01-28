import{a as N}from"./vendor-CQpva9gi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const p of s.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&i(p)}).observe(document,{childList:!0,subtree:!0});function o(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=o(r);fetch(r.href,s)}})();window.openMenu=function(){document.getElementById("backdrop").classList.add("is-open")};window.closeMenu=function(){document.getElementById("backdrop").classList.remove("is-open")};window.menuLayoutClickHandler=function(t){t.stopPropagation()};async function $(){return await(await fetch("https://your-energy.b.goit.study/api/quote",{headers:{Accept:"application/json"}})).json()}function j(e){const t=new Date().toISOString().split("T")[0];localStorage.setItem("quote",JSON.stringify({date:t,data:e}))}function B(){const e=JSON.parse(localStorage.getItem("quote"));if(e){const t=new Date().toISOString().split("T")[0];if(e.date===t)return e.data}return null}async function D(){let e=B();if(!e)try{e=await $(),j(e)}catch(t){console.error("Error fetching the quote:",t);return}document.querySelectorAll(".quote-text").forEach(t=>{t.textContent=e.quote}),document.querySelectorAll(".quote-author").forEach(t=>{t.textContent=e.author})}document.addEventListener("DOMContentLoaded",D);const X="/desperate-pancakes-development/assets/icons-D0JUX4go.svg",y="data:image/svg+xml,%3csvg%20aria-hidden='true'%20style='position:%20absolute;%20width:%200;%20height:%200;%20overflow:%20hidden;'%20version='1.1'%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%3e%3cdefs%3e%3csymbol%20id='icon-trash'%20viewBox='0%200%2032%2032'%3e%3cpath%20stroke-linejoin='round'%20stroke-linecap='round'%20stroke-miterlimit='4'%20stroke-width='2.4'%20d='M21.333%208v-1.067c0-1.493%200-2.24-0.291-2.811-0.256-0.502-0.664-0.91-1.165-1.165-0.57-0.291-1.317-0.291-2.811-0.291h-2.133c-1.493%200-2.24%200-2.811%200.291-0.502%200.256-0.91%200.664-1.165%201.165-0.291%200.57-0.291%201.317-0.291%202.811v1.067M13.333%2015.333v6.667M18.667%2015.333v6.667M4%208h24M25.333%208v14.933c0%202.24%200%203.36-0.436%204.216-0.383%200.753-0.995%201.364-1.748%201.748-0.856%200.436-1.976%200.436-4.216%200.436h-5.867c-2.24%200-3.36%200-4.216-0.436-0.753-0.384-1.365-0.995-1.748-1.748-0.436-0.856-0.436-1.976-0.436-4.216v-14.933'%3e%3c/path%3e%3c/symbol%3e%3csymbol%20id='icon-close-white'%20viewBox='0%200%2032%2032'%3e%3cpath%20fill='none'%20stroke='%23f4f4f4'%20style='stroke:%20var(--color1,%20%23f4f4f4)'%20stroke-linejoin='round'%20stroke-linecap='round'%20stroke-miterlimit='4'%20stroke-width='2.2857'%20d='M22.667%209.333l-13.333%2013.333M9.333%209.333l13.333%2013.333'%3e%3c/path%3e%3c/symbol%3e%3csymbol%20id='icon-heart-favorites'%20viewBox='0%200%2032%2032'%3e%3cpath%20stroke-linejoin='round'%20stroke-linecap='round'%20stroke-miterlimit='4'%20stroke-width='2.4'%20d='M27.787%206.147c-0.681-0.681-1.49-1.222-2.38-1.591s-1.844-0.559-2.807-0.559c-0.963%200-1.917%200.19-2.807%200.559s-1.699%200.909-2.38%201.591l-1.413%201.413-1.413-1.413c-1.376-1.376-3.241-2.148-5.187-2.148s-3.811%200.773-5.187%202.148c-1.376%201.376-2.148%203.241-2.148%205.187s0.773%203.811%202.148%205.187l11.787%2011.787%2011.787-11.787c0.681-0.681%201.222-1.49%201.591-2.38s0.559-1.844%200.559-2.807c0-0.963-0.19-1.917-0.559-2.807s-0.909-1.699-1.591-2.38z'%3e%3c/path%3e%3c/symbol%3e%3csymbol%20id='icon-rating-star'%20viewBox='0%200%2034%2032'%3e%3cpath%20fill=''%20d='M14.89%202.282c0.737-2.268%203.945-2.268%204.682%200l2.080%206.402c0.33%201.014%201.275%201.701%202.341%201.701h6.731c2.384%200%203.376%203.051%201.447%204.453l-5.446%203.957c-0.863%200.627-1.224%201.738-0.894%202.752l2.080%206.402c0.737%202.268-1.859%204.154-3.788%202.752l-5.446-3.957c-0.863-0.627-2.031-0.627-2.894%200l-5.446%203.957c-1.929%201.402-4.525-0.484-3.788-2.752l2.080-6.402c0.33-1.014-0.031-2.125-0.894-2.752l-5.446-3.957c-1.929-1.402-0.938-4.453%201.447-4.453h6.731c1.066%200%202.012-0.687%202.341-1.701l2.080-6.402z'%3e%3c/path%3e%3c/symbol%3e%3c/defs%3e%3c/svg%3e",x="https://your-energy.b.goit.study/api/exercises/";let d=null,u=!1,n;const c=document.querySelector(".modal-overlay"),q=document.querySelector(".exercise"),T=document.querySelector(".modal-close-button"),R=document.querySelector(".modal-image-gif"),C=document.querySelector(".modal-info-name"),H=document.querySelector(".modal-info-rating-score"),J=document.querySelector(".modal-info-rating-stars-filled"),_=document.querySelector(".modal-info-targets-list"),W=document.querySelector(".modal-info-description"),m=document.querySelector(".add-to-favorites"),w=document.querySelector(".give-a-rating"),M=document.querySelector(".rating"),f=document.getElementById("userForm"),L=document.querySelector(".modal-close-rating-button"),g=document.querySelectorAll(".custom-radio-star"),O=document.querySelector(".modal-rating-block-score-value"),a=document.querySelector(".modal-error-label-text");let l;function h(){T.removeEventListener("click",F),c.removeEventListener("click",P),document.removeEventListener("keydown",I),Q()}function F(){c.classList.remove("is-open"),h()}function P(e){e.target===c&&(c.classList.remove("is-open"),h())}function I(e){e.key==="Escape"&&(c.classList.remove("is-open"),h())}function Q(){u=!1,d=null,l=0}function z(){T.addEventListener("click",F),c.addEventListener("click",P),document.addEventListener("keydown",I)}function U(){m.removeEventListener("click",b),m.addEventListener("click",b)}function b(e){e.preventDefault();const t=JSON.parse(window.localStorage.getItem("favorites"));if(!t||!t.length?window.localStorage.setItem("favorites",JSON.stringify([n._id])):t.includes(n._id)||window.localStorage.setItem("favorites",JSON.stringify([...t,n._id])),u){const o=t.filter(i=>i!==n._id);window.localStorage.setItem("favorites",JSON.stringify([...o])),typeof window.removeExerciseFromFavoritesWithAnimation=="function"&&window.removeExerciseFromFavoritesWithAnimation(n._id)}A(n._id)}function A(e){const t=JSON.parse(window.localStorage.getItem("favorites"));t&&t.length&&t.includes(e)?(u=!0,m.innerHTML=`Remove from favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='${y}#icon-trash'></use>
                        </svg>`):(u=!1,m.innerHTML=`Add to favorites
                        <svg class='add-to-favorites-icon'>
                            <use href='${y}#icon-heart-favorites'></use>
                        </svg>`)}function S(){q.classList.add("hide-window"),setTimeout(()=>{M.classList.remove("hide-window")},150)}function v(){M.classList.add("hide-window"),setTimeout(()=>{O.innerText="0.0",g.forEach(e=>{e.classList.remove("checked-rating")}),q.classList.remove("hide-window"),f.reset()},150)}function E(e){e.preventDefault(),l=e.target.value,O.innerText=`${l}.0`,g.forEach(t=>{Number(t.value)<=Number(l)?t.classList.add("checked-rating"):t.classList.remove("checked-rating")})}function k(e){e.preventDefault();const t=new FormData(f),o=Object.fromEntries(t.entries()),i=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;if(o.email&&!i.test(o.email.toString())){a.innerText="Invalid email format";return}l&&(o.rate=Number(l)),o.rate&&o.email&&o.review?(a.innerText="",K(o)):o.rate?o.email?o.review||(a.innerText="Please fill in your comment"):a.innerText="Please fill in your email":a.innerText="Please give a rating"}async function K(e){const t=x+d+"/rating";try{const o=await fetch(t,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!o.ok)throw a.innerText="Something went wrong. Please try again",new Error(`Error: ${o.status} ${o.statusText}`);const i=await o.json();return v(),i}catch(o){throw a.innerText="Something went wrong. Please try again",console.error("Error sending PATCH request:",o.message),o}}function Z(){w.removeEventListener("click",S),L.removeEventListener("click",v),f.removeEventListener("submit",k),g.forEach(e=>{e.removeEventListener("click",E)}),w.addEventListener("click",S),L.addEventListener("click",v),f.addEventListener("submit",k),g.forEach(e=>{e.addEventListener("click",E)})}const G=async e=>{try{return(await N.get(x+e)).data}catch(t){throw console.error("Error fetching data",t),t}};async function Y(e){if(console.log(e.target),console.log(e.currentTarget),e.target.matches("[data-modal-open]")&&(d=e.target.getAttribute("data-modal-open"),d.length&&(n=await G(d),n))){z(),Z(),A(n._id),U(),R.src=n.gifUrl||"../images/gif.jpg",C.innerText=n.name||"";const t=Math.round(n.rating),o=t*20+20;J.style.setProperty("width",`${o}px`,"important"),H.innerText=`${t}.0`;const i={target:{title:"Target",subtitle:n.target},bodyPart:{title:"Body Part",subtitle:n.bodyPart},equipment:{title:"Equipment",subtitle:n.equipment},popularity:{title:"Popular",subtitle:n.popularity},burnedCalories:{title:"Burned calories",subtitle:`${n.burnedCalories}/${n.time}`}};_.innerHTML=Object.keys(i).map(r=>`<li class='modal-info-targets-list-item'>
    <div class='modal-info-targets-list-item-container'>
    <p class='modal-info-targets-list-item-container-title'>${i[r].title}</p>
    <p class='modal-info-targets-list-item-container-subtitle'>${i[r].subtitle}</p>
    </div>
  </li>`).join(""),W.innerHTML=`<p>${n.description}</p>`,c.classList.add("is-open")}}export{Y as h,X as i};
//# sourceMappingURL=modal-window-DFfdQdUV.js.map
