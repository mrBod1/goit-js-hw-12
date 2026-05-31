import{a as E,S as B,i as d}from"./assets/vendor-DcHCnVjq.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();const M="https://pixabay.com/api/",$="55995146-68255106f2e9e9fafe03769e0";async function y(o,e){const s={key:$,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:e};return(await E.get(M,{params:s})).data}const g=document.querySelector(".gallery"),h=document.querySelector(".loader"),L=document.querySelector("#load-more"),O=new B(".gallery a",{captionsData:"alt",captionDelay:250});function v(o){const e=o.map(({webformatURL:s,largeImageURL:n,tags:t,likes:r,views:a,comments:w,downloads:q})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${n}">
          <img class="gallery-image" src="${s}" alt="${t}" loading="lazy" />
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <span class="gallery-info-label">Likes</span>
            <span>${r}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Views</span>
            <span>${a}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Comments</span>
            <span>${w}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Downloads</span>
            <span>${q}</span>
          </div>
        </div>
      </li>`).join("");g.insertAdjacentHTML("beforeend",e),O.refresh()}function R(){g.innerHTML=""}function b(){h.classList.remove("is-hidden")}function S(){h.classList.add("is-hidden")}function x(){L.classList.remove("is-hidden")}function i(){L.classList.add("is-hidden")}const u=document.querySelector(".form"),f=u.elements["search-text"],p=u.querySelector("button"),H=document.querySelector("#load-more");let c="",l=1,m=0;p.disabled=!0;f.addEventListener("input",()=>{p.disabled=f.value.trim()===""});u.addEventListener("submit",D);H.addEventListener("click",N);function P(){u.reset(),p.disabled=!0}function T(o,e){return o===15&&e>15}function A(){const o=document.querySelector(".gallery-item");if(!o)return;const e=o.getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}async function D(o){if(o.preventDefault(),c=f.value.trim(),!!c){l=1,R(),i(),b();try{const e=await y(c,l);if(m=e.totalHits,e.hits.length===0){d.info({message:"No images found. Try another query.",position:"topRight"});return}v(e.hits),T(e.hits.length,m)?x():i()}catch{d.error({message:"Something went wrong. Try again later.",position:"topRight"}),i()}finally{S(),P()}}}async function N(){l+=1,b();try{const o=await y(c,l);v(o.hits),A(),l*15>=m&&(i(),d.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{d.error({message:"Error loading more images.",position:"topRight"}),i()}finally{S()}}
//# sourceMappingURL=index.js.map
