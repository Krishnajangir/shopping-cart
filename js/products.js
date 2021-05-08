import { templateUI } from './template.js';

productInterface = () => {
    document.getElementById("items").innerHTML = localStorage.getItem("productNumbers") || 0;
    const selectedValue = gatCurrentValue();
    getProducts().then((data) => {
        let elements = "";
        const dataToRender = (selectedValue === 'All') ? data : data.filter(d => d.category === PRODUCT_KEYS[selectedValue]);
        dataToRender.forEach((productData) => {
            elements += templateUI.product(productData)
            document.getElementById("own-products").innerHTML = elements;
        })
    });
};

gatCurrentValue = () => {
    return localStorage.getItem("productType") || "All";
};

changeLinkItem = () => {
    let link = document.getElementById("myLinks");
    if (link.style.display === "block") {
        link.style.display = "none";
    } else {
        link.style.display = "block";
    }
};

goToCartPage = () => {
    if (document.body.clientWidth < 500)
        window.location.href = "../views/cart.html#";
    else getCartData();
};

goToLink = (value) => {
    addLinkProperty();
    localStorage.setItem("productType", value);
    productInterface();
};

addLinkProperty = () => {
    $(function() {
        let links = $('a.link').click(function() {
            links.removeClass('active-link');
            $(this).addClass('active-link');
        });
    });
}

cartInterface = (cartValues, itemNumber) => {
    let cartUI = '';
    priceValues = [];
    quantity = 1;
    cartValues.forEach((val) => {
        priceValues.push(val.price);
        localStorage.setItem('priceValues', priceValues);
        cartUI += `<div class="cart-element">
        <img id="imgg" src="${val.imageURL}" alt="cart-images" height="100px" />
        <divb class="cart-item-detail">
          <h4 class="modal-text">${val.name}</h4>
          <i
            onclick="increaseItems(event , '${val.price}')"
            class="fa fa-plus cart-icon-class"
          ></i>
          <input class="itemQuantity" value="${quantity}" disabled />
          <i
            onclick="decreaseItems(event , '${val.price}')"
            class="fa fa-minus cart-icon-class"
          ></i>
          <i class="fa fa-times" aria-hidden="true"></i>
        <span>Rs. </span><span class="price">${val.price} </span>
          <div class="total-cart-cost">
            <span>Total: Rs. </span><span class="priceNew">${val.price} </span>
          </div>
        </divb><span onclick="addToCart().removeProduct('${val.sku}')"><i class="fa fa-trash " ></i></span>
      </div>`;
        document.querySelector(".items").innerHTML = cartUI;
        document.getElementById("cartModal").style.display = "block";
        document.querySelector(
            ".modal-header"
        ).innerHTML = `My Cart (${itemNumber} items)`;
    })
    let prices = localStorage.getItem('priceValues').split(',');
    document.querySelector('.totalPrice').innerHTML = 'Rs. ' + prices.reduce(addToCart().totalPrice);
};


getCartData = () => {
    cartProductData = JSON.parse(localStorage.getItem("selectedCartData")) || [];
    if (cartProductData.length !== 0) {
        let cartValues = [];
        getProducts().then((data) => {
            data.filter((val) => {
                cartProductData.forEach((data) => {
                    if (val.sku === data) {
                        cartValues.push(val);
                    }
                });
            });
            cartInterface(cartValues, cartProductData.length);
        })
    } else emptyCartInterface();
};

emptyCartInterface = () => {
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("emptyCart").style.display = "block";
};

resizeCartWindow = () => {
    if (document.body.clientWidth > 700) document.getElementById("myLinks").style.display = "block";
}

closeCartModal = () => {
    document.getElementById("cartModal").style.display = "none";
    document.getElementById("emptyCart").style.display = "none";
};

closeModal = () => {
    $("#itemNotExist").hide();
    $("#itemExist").hide();
};

productInterface();