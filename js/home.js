let slideIndex = 1;


async function getProductCategories() {
    return await (await fetch(CATEGORIES_END_POINT)).json()
        .catch(() => alert('server is not running please run server first with `npm start`'))
}

categoriesInterface = (showSlides) => {
    let homeItems = '';
    const template = new Templates;
    itemNumber.innerHTML = localStorage.getItem("productNumbers") || 0;
    getProductCategories().then((data) => {
        data.forEach((val, index) => {
            console.log('index', index)
            if (!val.imageUrl) {
                val.imageUrl = '../static/images/fallback-image.png"';
            }
            if (index % 2 === 0) {
                homeItems += template.evenCategory(val);
            } else {
                homeItems += template.oddCategory(val);
            }
            document.querySelector(".category-list").innerHTML = homeItems;
        })
    })
    showSlides(slideIndex);
}


function plusSlides(n) {
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

function showSlides(n) {
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active-dot";
}

goToProductsList = (text) => {
    localStorage.setItem('productType', EXPLORE_TYPE[text]);
    window.location.href = "../views/products.html";
}

categoriesInterface(showSlides)