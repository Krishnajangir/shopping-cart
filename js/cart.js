resizeCartWindow = () => {
    if (document.body.clientWidth > 500) {
        window.location.href = PRODUCT_PATH;
    }
}
getCartData = () => {
    cartProductData = JSON.parse(localStorage.getItem("selectedCartData"));
    document.querySelector(".cart-item-text").innerHTML = (cartProductData.length === null ? 0 : cartProductData.length);
    if (cartProductData.length !== 0) {
        cartValues = [];
        getProducts().then((data) => {
            data.filter((val) => {
                cartProductData.forEach((data) => {
                    if (val.sku === data) {
                        cartValues.push(val);
                    }
                });
            });
            getMobileCartData(cartValues, cartProductData.length)
        })
    } else {
        emptyMobileCartInterface();
    }
};

getMobileCartData = (cartValues, itemNumber) => {
    let template = new Templates;
    let cartItem = '';
    priceValues = [];
    quantity = 1;
    const cartItemSelector = document.querySelector(".items");
    const emptyContainer = document.getElementById('cart-empty-container');
    const cartItemValue = document.querySelector(".cart-item-header");
    cartValues.forEach((val) => {
        priceValues.push(val.price);
        localStorage.setItem('priceValues', priceValues);
        cartItem += template.cartItem(val, quantity);
        cartItemSelector.innerHTML = cartItem;
        emptyContainer.style.display = "none";
        cartItemValue.innerHTML = `My Cart (${itemNumber} items) `;

    })
    let prices = localStorage.getItem('priceValues').split(',');
    document.querySelector('.totalPrice').innerHTML = 'Rs. ' + prices.reduce(addToCart().totalPrice);
}

emptyMobileCartInterface = () => {
    document.getElementById('mobile-cart-container').style.display = "none";
    document.getElementById('cart-empty-container').style.display = "block";
}

proceedToBuy = () => {
    alert("Thankyou for doing shopping with us ,waiting for your next arrival here.");
    localStorage.clear();
    window.location.href = "../views/products.html";

}

deleteMobileCartData = () => {
    emptyMobileCartInterface();
    localStorage.clear();
    window.location.reload();
}

startShop = () => window.location.href = PRODUCT_PATH;

getCartData();