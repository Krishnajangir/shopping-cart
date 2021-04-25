const PRODUCTS_ENDPOINTS = "http://localhost:5000/products";
const CART_PATH = "http://127.0.0.1:5500/views/cart.html";

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
    }).catch(error => {
      alert('Server is not running')
    });
};

getCartData = () => {
  productId = JSON.parse(localStorage.getItem("productId"));
    if (productId !== null) {
      cartRenderedValues.filter((val) => {
        productId.forEach((data) => {
          if (val.sku === data) {
            cartValues.push(val);
          }
        });
      }); cartInterface(cartValues , productId.length);
  } else {
   emptyCartInterface();
  }
};

emptyCartInterface = () => {
  document.getElementById("emptyCart").style.display = "block";
};

cartInterface = (cartValues , itemNumber) => {
  let cartElement = document.createElement("card");
  cartElement.className = "cart-element";
  for (let i = 0; i < cartValues.length; i++) {
    dataNew.push(cartValues[i]);
 
    cartElement.innerHTML = `<img id="imgg" src="${dataNew[i].imageURL}" alt="cart-images" height="100px">
                <div> <h4 class="modal-text">${dataNew[i].name}</h4> <i onclick="increaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-plus cart-icon-class"></i>
                    <input class="itemQuantity" value="${quantity}" disabled/>
                    <i onclick="decreaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-minus cart-icon-class"></i>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <span>Rs. </span><span id="price">${dataNew[i].price} </span>
                    <div class="total-cart-cost">
                        <span>Total: Rs. </span><span class="priceNew">${dataNew[i].price} </span>
                    </div>`;
   
  }
  document.querySelector(".items").appendChild(cartElement);
  cartItemInterface(itemNumber);
    document.getElementById("cartModal").style.display = "block";
};

cartItemInterface = (itemNumber) => {
  document.querySelector(".modal-header").innerHTML = `My Cart (${itemNumber} items)`;
}

getProductsDetails();
increaseItems = (quantity, price) => {
  document.querySelector('.itemQuantity').value = ++quantity;
  document.querySelector('.priceNew').innerHTML = price*quantity
};
decreaseItems = (selectedItem) => {
  document.querySelector('.itemQuantity').value = --quantity;
  document.querySelector('.priceNew').innerHTML = price*quantity
};

proceedToBuy = () => {
  document.getElementById("thanksMsg").style.display = "block";
};

closeCartModal = () => {
  document.getElementById('cartModal').style.display = "none";
  document.getElementById("emptyCart").style.display = "none";
}
window.onclick = function (event) {
  if (event.target == document.getElementById('cartModal') || event.target == document.getElementById('emptyCart')) {
    closeCartModal();
  }
};
