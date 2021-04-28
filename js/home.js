const CATEGORIES_END_POINT = "http://localhost:5000/categories";
const BANNERS_END_POINT = "http://localhost:5000/banners";

let dataNew = [];
let homeDetails;
let productItem;

getProductCategories = () => {
  localStorage.clear();
  fetch(CATEGORIES_END_POINT)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      categoriesDivision(data);
    }).catch(() => {
      alert('server is not running please run server first with `npm start`')
   })
};

categoriesDivision = (categories) => {
  for (let i in categories) {
    if (!categories[i].imageUrl) {
      categories.splice(i - 1, 1);
    }
    dataNew.push(categories[i]);
    let badge = document.createElement("div");
    badge.className = "badge";
    if(i % 2 === 0) {
      badge.innerHTML =
      `<div class="w3-panel w3-card" style="display:flex;">
      <img class="odd-img" src='${dataNew[i].imageUrl}' height="30%" width="30%"/>
      <div class="own-cat-info"><h1>
      ${dataNew[i].name}</h1><p>
      ${dataNew[i].description} </p><button  onclick='goToProductsList("${dataNew[i].key}")' id='explore'>
      Explore 
      ${dataNew[i].key}
      </button></div></div><div class='gred-shadow'></div>`;
    }
   else {
    badge.innerHTML =
    `<div class="w3-panel w3-card" style="display:flex;">
    <div class="own-cat-info even-text"><h1>
    ${dataNew[i].name}</h1><p>
    ${dataNew[i].description} </p><button  onclick='goToProductsList("${dataNew[i].key}")' id='explore'>
    Explore 
    ${dataNew[i].key}
    </button></div>  <img class="even-img" src='${dataNew[i].imageUrl}' height="30%" width="30%"/></div><div class='gred-shadow'></div>`;
   }
     document.getElementById("own-cat").appendChild(badge);
  }
}

var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
goToProductsList = (text) => {
  switch(text) {
    case "fruit-and-veg":
          productItem = "fruit";
          break;
        case "bakery-cakes-dairy":
          productItem = "bakeries";
          break;
        case "beverages":
          productItem = "beverage";
          break;
        case "beauty-hygiene":
          productItem = "beauties";
          break;
        default : 
          productItem = "babies";
          break;
  }
  localStorage.setItem('productItem' , productItem);
  window.location.href = "http://127.0.0.1:5500/views/products.html";
}
getProductCategories()