const toggler = document.querySelector(".nav__toggler-wrap");
const nav = document.querySelector(".nav__list");

// Mobile Menu toggle
toggler.addEventListener("click", function() {
  this.classList.toggle("active");
  nav.classList.toggle("active");
});
// Mobile Nav Link hiding menu on click
nav.addEventListener("click", function(e) {
  if (e.target.classList.contains("nav__link")) {
    toggler.classList.remove("active");
    nav.classList.remove("active");
  }
});

const section = document.querySelectorAll(".scroll");
const sections = {};
// Get sections offsetTop after all images are loaded / resize screen
window.onload = function() {
  section.forEach(function(e) {
    sections[e.id] = e.offsetTop;
  });
};
window.addEventListener("resize", function() {
  section.forEach(function(e) {
    sections[e.id] = e.offsetTop;
  });
});

let scrollPos;
window.addEventListener("scroll", function() {
  // Hide Nav on scrolling down
  if(document.body.getBoundingClientRect().top > scrollPos){
    document.querySelector(".nav").removeAttribute("style");
  } else {
    if(!nav.classList.contains("active")){
      document.querySelector(".nav").style.transform = "translateY(-100%)";
    }
  }
  scrollPos = document.body.getBoundingClientRect().top;

  // Scale Logo on scrollPosition === 0
  if (this.scrollY === 0) {
    document.querySelector(".nav__logo-img").classList.remove("scrolled");
  } else {
    document.querySelector(".nav__logo-img").classList.add("scrolled");
  }

  // Toggle active class on Nav links depending on scroll position
  for (let i in sections) {
    if (sections[i] - 200 <= this.scrollY) {
      document.querySelectorAll(".nav__link").forEach(function(link) {
        link.classList.remove("active");
      });
      document.querySelector(`[data-link="${i}"]`).classList.add("active");
    }
  }
});

// Gallery grid: Add 1 grid item more on click
const galleryMore = document.querySelector("#gallery-btn");
const galleryGrid = document.querySelector("#gallery .grid");

galleryMore.addEventListener("click", function() {
  const randomImg = Math.floor(Math.random() * 5 + 1);
  const div = document.createElement("div");
  div.className = "grid__item";
  const img = document.createElement("img");
  img.className = "grid__img";
  img.setAttribute("src", `./img/gallery_${randomImg}.jpg`);
  img.setAttribute("alt", `gallery_${randomImg}`);
  div.appendChild(img);
  galleryGrid.appendChild(div);
});

// Blog grid: Add 3 grid item more on click
const blogMore = document.querySelector("#blog-btn");
const blogGrid = document.querySelector("#blog .grid-blog");

blogMore.addEventListener("click", function() {
    for(let i=0; i<3; i++){
        const randomImg = Math.floor(Math.random() * 3 + 1);
        const article = document.createElement('article');
        article.className = "grid-blog__item";
        article.innerHTML = `
            <img class="grid-blog__img" src="./img/blog_${randomImg}.jpg" alt="blog_${randomImg}" />
            <p class="grid-blog__date">
                20<span>NOV</span>
            </p>
            <div class="grid-blog__content">
                <h3 class="grid-blog__title">Green Smoothies: Too Much of a Good Thing?</h3>
                <p class="grid-blog__meta">By Auskteez - 2 hours ago</p>
            </div>
        `;
      blogGrid.appendChild(article);
    }
});
