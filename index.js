import{a as R,S as M,i}from"./assets/vendor-DcHCnVjq.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}})();const $="https://pixabay.com/api/",P="55995146-68255106f2e9e9fafe03769e0";async function g(s,t){const a={key:P,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t};return(await R.get($,{params:a})).data}const y=document.querySelector(".gallery"),h=document.querySelector(".loader"),v=document.querySelector("#load-more"),O=new M(".gallery a",{captionsData:"alt",captionDelay:250});function L(s){const t=s.map(({webformatURL:a,largeImageURL:r,tags:e,likes:o,views:l,comments:q,downloads:B})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${a}" alt="${e}" loading="lazy" />
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <span class="gallery-info-label">Likes</span>
            <span>${o}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Views</span>
            <span>${l}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Comments</span>
            <span>${q}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Downloads</span>
            <span>${B}</span>
          </div>
        </div>
      </li>`).join("");y.insertAdjacentHTML("beforeend",t),O.refresh()}function x(){y.innerHTML=""}function b(){h.classList.remove("is-hidden")}function S(){h.classList.add("is-hidden")}function w(){v.classList.remove("is-hidden")}function n(){v.classList.add("is-hidden")}const u=document.querySelector(".form"),f=u.elements["search-text"],p=u.querySelector("button"),A=document.querySelector("#load-more");let d="",c=1,m=0;const E=15;p.disabled=!0;f.addEventListener("input",()=>{p.disabled=f.value.trim()===""});u.addEventListener("submit",T);A.addEventListener("click",_);function H(){u.reset(),p.disabled=!0}function N(){const s=document.querySelector(".gallery-item");if(!s)return;const t=s.getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}async function T(s){if(s.preventDefault(),d=f.value.trim(),!!d){c=1,x(),n(),b();try{const t=await g(d,c);if(m=t.totalHits,t.hits.length===0){i.info({message:"No images found. Try another query.",position:"topRight"});return}L(t.hits),m<=E?(n(),i.info({message:"You've reached the end of search results.",position:"topRight"})):w()}catch{i.error({message:"Something went wrong. Try again later.",position:"topRight"}),n()}finally{S(),H()}}}async function _(){c+=1,n(),b();try{const s=await g(d,c);if(!s.hits.length){i.info({message:"No more images available.",position:"topRight"});return}L(s.hits),N(),c*E>=m?(n(),i.info({message:"You've reached the end of search results.",position:"topRight"})):w()}catch{i.error({message:"Error loading more images.",position:"topRight"}),n()}finally{S()}}
//# sourceMappingURL=index.js.map
