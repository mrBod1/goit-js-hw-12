import{a as p,S as g,i as o}from"./assets/vendor-GgwdjDaY.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();const m="https://pixabay.com/api/",y="55995146-68255106f2e9e9fafe03769e0";function h(n){const a={key:y,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0};return p.get(m,{params:a}).then(r=>r.data).catch(r=>{throw r})}const c=document.querySelector(".gallery"),f=document.querySelector(".loader"),v=new g(".gallery a",{captionsData:"alt",captionDelay:250});function L(n){const a=n.map(({webformatURL:r,largeImageURL:s,tags:e,likes:t,views:i,comments:u,downloads:d})=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${s}">
          <img
            class="gallery-image"
            src="${r}"
            alt="${e}"
            loading="lazy"
          />
        </a>
        <div class="gallery-info">
          <div class="gallery-info-item">
            <span class="gallery-info-label">Likes</span>
            <span>${t}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Views</span>
            <span>${i}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Comments</span>
            <span>${u}</span>
          </div>
          <div class="gallery-info-item">
            <span class="gallery-info-label">Downloads</span>
            <span>${d}</span>
          </div>
        </div>
      </li>
    `).join("");c.insertAdjacentHTML("beforeend",a),v.refresh()}function b(){c.innerHTML=""}function S(){f.classList.remove("is-hidden")}function w(){f.classList.add("is-hidden")}const l=document.querySelector(".form"),E=l.elements["search-text"];l.addEventListener("submit",q);function q(n){n.preventDefault();const a=E.value.trim();if(!a){o.warning({title:"Warning",message:"Please enter a search query.",position:"topRight"});return}l.reset(),b(),S(),h(a).then(r=>{const{hits:s}=r;if(!s||s.length===0){o.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}L(s)}).catch(r=>{o.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(r)}).finally(()=>{w()})}
//# sourceMappingURL=index.js.map
