import{S as p,i as c}from"./assets/vendor-5b791d57.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();let h=new p(".image-link",{captionsData:"alt",captionDelay:250});const g=document.querySelector(".form"),l=document.querySelector(".input-name"),d=document.querySelector(".loader"),u=document.querySelector(".gallery");g.addEventListener("submit",y);function y(i){i.preventDefault();const r=l.value.trim();if(r===""){c.show({title:"Error",message:"Please enter a search query"});return}if(/\s/.test(r)){c.show({title:"Error",message:"Search query cannot contain spaces"}),l.value="";return}const a="https://pixabay.com",o="/api/",e="42310325-d8e2b88bd4f4d7db9639050a5",t=new URLSearchParams({key:e,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}),s=`${a}${o}?${t}`;d.classList.add("visible"),fetch(s).then(n=>n.json()).then(n=>{v(n.hits),d.classList.remove("visible")}).catch(n=>{console.log("Error fetching data:",n),d.classList.remove("visible"),c.show({title:"Error",message:"Failed to fetch data. Please check your internet connection."})}),l.value=""}function b(i,r,a,o,e,t,s){return`<li class="photo">
  <div class="photo-card">
    <a class="image-link" data-lightbox="image" href="${r}">
    <img class="gallery-image" data-source="${r}"  src="${i}" alt="${a}"></img>
    </a>
    </div>
      <div class="description">
        <p class="description-item"> Likes ${o}</p>
        <p class="description-item"> Views ${e}</p>
        <p class="description-item"> Comments ${t}</p>
        <p class="description-item"> Downloads ${s}</p>
    
    </div>
  </li>`}function v(i){u.innerHTML="",i.length===0&&c.show({message:"Sorry, there are no images matching your search query. Please try again!",backgroundColor:"red",messageColor:"white",messageSize:"25"}),i.forEach(r=>{const{webformatURL:a,largeImageURL:o,tags:e,likes:t,views:s,comments:n,downloads:m}=r,f=b(a,o,e,t,s,n,m);u.insertAdjacentHTML("beforeend",f)}),h.refresh()}
//# sourceMappingURL=commonHelpers.js.map
