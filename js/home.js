let slideIndex = 1;


async function getProductCategories() {
    return await (await fetch(CATEGORIES_END_POINT)).json()
        .catch(() => alert('server is not running please run server first with `npm start`'))
}

categoriesInterface = (showSlides) => {
    let homeItems = '';
    getProductCategories().then((data) => {
        data.forEach((val, index) => {
            console.log('index', index)
            if (!val.imageUrl) {
                val.imageUrl = '../static/images/fallback-image.png"';
            }
            if (index % 2 === 0) {
                homeItems +=
                    `<div class="badge">
                    <div class="w3-panel w3-card" style="display: flex">
                      <img
                        class="odd-img"
                        src="${val.imageUrl}"
                        height="30%"
                        width="30%"
                      />
                      <div class="own-cat-info">
                        <h1>${val.name}</h1>
                        <p>${val.description}</p>
                        <button onclick='goToProductsList("${val.key}")' id="explore">
                          Explore ${val.key}
                        </button>
                      </div>
                    </div>
                    <div class="gred-shadow"></div>
                  </div>
                  `;
            } else {
                homeItems +=
                    `<div class="w3-panel w3-card" style="display:flex;">
                    <div class="own-cat-info even-text">
                        <h1>
                            ${val.name}</h1>
                        <p>
                            ${val.description} </p><button onclick='goToProductsList("${val.key}")' id='explore'>
                            Explore
                            ${val.key}
                        </button>
                    </div> <img class="even-img" src='${val.imageUrl}' height="30%" width="30%" />
                </div>
                <div class='gred-shadow'></div>
                </div>`;
            }
            document.getElementById("own-cat").innerHTML = homeItems;
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
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

goToProductsList = (text) => {
    localStorage.setItem('productType', EXPLORE_TYPE[text]);
    window.location.href = "http://127.0.0.1:5500/views/products.html";
}

categoriesInterface(showSlides)