resizeCartWindow = () => {
    if (document.body.clientWidth > 500) {
        window.location.href = PRODUCT_PATH;
    }
}
getCartData = () => {
    cartProductData = JSON.parse(localStorage.getItem("selectedCartData"));
    document.getElementById("items").innerHTML = (cartProductData.length === null ? 0 : cartProductData.length) + " items";
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
    let cartItem = '';
    quantity = 1;
    cartValues.forEach((val) => {
        cartItem += `<div class="cart-mobile">
      <img
        id="imgg"
        src="${val.imageURL}"
        alt="cart-images"
        height="100px"
      />
      <div>
        <h4 class="modal-text">${val.name}</h4>
        <i
          onclick="increaseItems(event)"
          class="fa fa-plus cart-icon-class"
        ></i>
        <input class="itemQuantity" value="${quantity}" disabled />
        <i
          onclick="decreaseItems(event)"
          class="fa fa-minus cart-icon-class"
        ></i>
        <i class="fa fa-times" aria-hidden="true"></i>
        <span>Rs. </span><span class="price">${val.price} </span>
        <div class="total-cart-cost">
          <span>Total: Rs. </span><span class="priceNew">${val.price} </span>
        </div>
      </div> <span onclick="addToCart().removeProduct('${val.sku}')"><i class="fa fa-trash " ></i></span>
    </div>`;
        document.querySelector(".items").innerHTML = cartItem;
        document.getElementById('cart-empty-container').style.display = "none";
        document.querySelector(".cart-item-header").innerHTML = `My Cart (${itemNumber} items) `;

    })
}

emptyMobileCartInterface = () => {
    document.getElementById('mobile-cart-container').style.display = "none";
    document.getElementById('cart-empty-container').style.display = "block";
}

proceedToBuy = () => {
    alert("Thankyou for doing shopping with us ,waiting for your next arrival here.");
    localStorage.clear();
    window.location.href = "http://127.0.0.1:5500/views/products.html";

}

deleteMobileCartData = () => {
    emptyMobileCartInterface();
    localStorage.clear();
    window.location.reload();
}

startShop = () => window.location.href = PRODUCT_PATH;

getCartData();