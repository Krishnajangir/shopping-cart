const PRODUCTS_ENDPOINTS = "http://localhost:5000/products";
const CART_PATH = "http://127.0.0.1:5500/views/cart.html";
const PRODUCT_PATH = "http://127.0.0.1:5500/views/products.html";

let cartRenderedValues = [];
dataNew = [];
itemCount = 0;
let cartValues = [];
let productId;
let quantity = 1;

getProductsDetails = () => {
  fetch(PRODUCTS_ENDPOINTS)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      cartRenderedValues = data;
      if(document.body.clientWidth < 500) {
        getCartData();
      } else window.location.href = PRODUCT_PATH;
  })
   
};

resizeCartWindow = () => {
  if(document.body.clientWidth > 500) {
    window.location.href = PRODUCT_PATH;
  }
}
getCartData = () => {
  productId = JSON.parse(localStorage.getItem("productId"));
    if (productId !== null) {
      cartValues = [];
      cartRenderedValues.filter((val) => {
        productId.forEach((data) => {
          if (val.sku === data) {
            cartValues.push(val);
          }
        });
      }); 
      if(document.body.clientWidth < 500) { 
        document.getElementById('cart-empty-container').style.display = "none";
        document.getElementById('mobile-cart-container').style.display = "block";
        getMobileCartData(cartValues , productId.length)
      }
      else cartInterface(cartValues , productId.length);
  } else {
    if(document.body.clientWidth < 500)  emptyMobileCartInterface();
    else emptyCartInterface(cartValues , productId.length);
  }
};

getMobileCartData = (cartValues , itemNumber) => {
  dataNew = [];
  for (let i in cartValues) {
    dataNew.push(cartValues[i]);
    let cartMobile = document.createElement("card");
    cartMobile.className = "cart-mobile";
    cartMobile.innerHTML = `<img id="imgg" src="${dataNew[i].imageURL}" alt="cart-images" height="100px">
                <div> <h4 class="modal-text">${dataNew[i].name}</h4> <i onclick="increaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-plus cart-icon-class"></i>
                    <input class="itemQuantity" value="${quantity}" disabled/>
                    <i onclick="decreaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-minus cart-icon-class"></i>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <span>Rs. </span><span id="price">${dataNew[i].price} </span>
                    <div class="total-cart-cost">
                        <span>Total: Rs. </span><span class="priceNew">${dataNew[i].price} </span>
                    </div>`;
                    document.querySelector(".items").appendChild(cartMobile);
                    cartMobileItemInterface(itemNumber);
  }
}

emptyMobileCartInterface= () => {
     document.getElementById('cart-empty-container').style.display = "block";
     document.getElementById('mobile-cart-container').style.display = "none";

}



cartMobileItemInterface = (itemNumber) => {
  document.querySelector(".cart-item-header").innerHTML = `My Cart (${itemNumber} items) <span onclick="deleteMobileCartData()"><i class="fa fa-trash " ></i></span>`;

}

increaseItems = (quantity, price) => {
  document.querySelector('.itemQuantity').value = ++quantity;
  document.querySelector('.priceNew').innerHTML = price*quantity
};
decreaseItems = (selectedItem) => {
  document.querySelector('.itemQuantity').value = --quantity;
  document.querySelector('.priceNew').innerHTML = price*quantity
};

deleteCartData = () => {
  localStorage.clear();
  closeCartModal();
  window.location.reload();
}

proceedToBuy = () => {
  document.getElementById("thanksMsg").style.display = "block";
};

closeCartModal = () => {
  $('.items').empty();
  document.getElementById('cartModal').style.display = "none";
  document.getElementById("emptyCart").style.display = "none";
}
deleteMobileCartData = () => {
  $('.items').empty();
  emptyMobileCartInterface()
}
window.onclick = function (event) {
  if (event.target == document.getElementById('cartModal') || event.target == document.getElementById('emptyCart')) {
    closeCartModal();
  }
};

startShop = () => window.location.href = PRODUCT_PATH;

getProductsDetails();