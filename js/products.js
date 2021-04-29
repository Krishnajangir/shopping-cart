productInterface = () => {
    let itemNumber = localStorage.getItem("productNumbers");
    document.getElementById("items").innerHTML = (itemNumber === null ? 0 : itemNumber) + " items";
    const selectedValue = gatCurrentValue();
    getProducts().then((data) => {
        let elements = "";
        const dataToRender = (selectedValue === 'All') ? data : data.filter(d => d.category === PRODUCT_KEYS[selectedValue]);
        dataToRender.forEach((productData) => {
            elements += `<div class="products">
            <div class="w3-card-4">
                <p>${productData.name} </p>
                <div class='base-header'>
                    <header class="w3-container header w3-white"><img id="image" style="margin: auto;" src='${productData.imageURL}' height="140px" width="100%" /></header>
                    <div class='base-footer'>
                        <div class='w3-container text-css'>
                            <div class="desc">
                                ${productData.description}</div>
                        </div>
                        <footer class="w3-container footer w3-white"><span id="mrp">
                           MRP Rs ${productData.price}</span><button onclick="addToCart('${productData.sku}')" style="cursor:pointer;margin-top: 4%;background-color: #c15151;;border: none;">
                           Buy Now</button></footer>
                    </div>
                </div>
            </div>
        </div>`
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
        window.location.href = "http://127.0.0.1:5500/views/cart.html#";
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

addToCart = (selectedItemName) => {
    let data = JSON.parse(localStorage.getItem("productId"));
    (function() {
        if (data === null) {
            data = data ? data.split(",") : [];
            data.push(selectedItemName);
            document.getElementById("itemNotExist").style.display = "block";
        } else {
            if (!data.includes(selectedItemName)) {
                data.push(selectedItemName);
                document.getElementById("itemNotExist").style.display = "block";
            } else document.getElementById("itemExist").style.display = "block";
        }
        localStorage.setItem("productId", JSON.stringify(data));
        localStorage.setItem("productNumbers", data === null ? 0 : data.length);
        document.getElementById("items").innerHTML = (data === null ? 0 : data.length) + " items";
    })();
};

getCartData = () => {
    productId = JSON.parse(localStorage.getItem("productId"));
    if (productId !== null) {
        let cartValues = [];
        getProducts().then((data) => {
            data.filter((val) => {
                productId.forEach((data) => {
                    if (val.sku === data) {
                        cartValues.push(val);
                    }
                });
            });
            cartInterface(cartValues, productId.length);
        })
    } else emptyCartInterface();
};

emptyCartInterface = () => {
    document.getElementById("emptyCart").style.display = "block";
};

cartInterface = (cartValues, itemNumber) => {
    let cartUI = '';
    quantity = 1;
    cartValues.forEach((val) => {
        cartUI += `<div class="cart-element">
        <img id="imgg" src="${val.imageURL}" alt="cart-images" height="100px" />
        <div class="cart-item-detail">
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
        document.querySelector(".items").innerHTML = cartUI;
        cartItemInterface(itemNumber);
        document.getElementById("cartModal").style.display = "block";
    })
};

cartItemInterface = (itemNumber) => {
    document.querySelector(
        ".modal-header"
    ).innerHTML = `My Cart (${itemNumber} items) <span onclick="deleteCartData()"><i class="fa fa-trash " ></i></span>`;
};

proceedToBuy = () => {
    document.getElementById("cartModal").style.display = "none";
    alert("Thankyou for doing shopping with us ,waiting for your next arrival here.");
    localStorage.clear();
    window.location.reload();

}

deleteCartData = () => {
    closeCartModal();
    localStorage.clear();
    window.location.reload();
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