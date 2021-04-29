resizeCartWindow = () => {
    if (document.body.clientWidth > 500) {
        window.location.href = PRODUCT_PATH;
    }
}
renderCartMobileView = () => {
    productId = JSON.parse(localStorage.getItem("productId"));
    let itemNumber = localStorage.getItem("productNumbers");
    document.getElementById("items").innerHTML = (itemNumber === null ? 0 : itemNumber) + " items";
    if (productId !== null) {
        cartValues = [];
        getProducts().then((data) => {
            data.filter((val) => {
                productId.forEach((data) => {
                    if (val.sku === data) {
                        cartValues.push(val);
                    }
                });
            });
            getMobileCartData(cartValues, productId.length)
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
      </div>
    </div>`;
        document.querySelector(".items").innerHTML = cartItem;
        cartMobileItemInterface(itemNumber);
        document.getElementById('cart-empty-container').style.display = "none";

    })
}

emptyMobileCartInterface = () => {
    document.getElementById('cart-empty-container').style.display = "block";
    document.getElementById('mobile-cart-container').style.display = "none";
}

cartMobileItemInterface = (itemNumber) => {
    document.querySelector(".cart-item-header").innerHTML = `My Cart (${itemNumber} items) <span onclick="deleteMobileCartData()"><i class="fa fa-trash " ></i></span>`;

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

renderCartMobileView();