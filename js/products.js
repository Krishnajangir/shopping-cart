const PRODUCTS_END_POINT = "http://localhost:5000/products";

// MAPPING
const PRODUCT_KEYS = {
  "fruit":"5b6899953d1a866534f516e2",

};


let dataNew = [];
let fruits = [];
let bakery = [];
let beverages = [];
let beauty = [];
let baby = [];
let outputData = [];
let renderedValues = [];
let quantity = 1;
let cartValues = [];

async function getProducts(value) {
  return (await (await fetch(PRODUCTS_END_POINT)).json());
}

getRenderedValues = (value) => {
  fetch(PRODUCTS_END_POINT)
    .then((response) => {
      return response.json();
    })
    .catch(() => {
      alert("server is not running please run server first with `npm start`");
    })
    .then((data) => {
      dataNew = [];
      fruits = [];
      bakery = [];
      beverages = [];
      beauty = [];
      baby = [];
      outputData = [];
      renderedValues = data;
      data.forEach((val) => {
        switch (val.category) {
          case "5b6899953d1a866534f516e2":
            fruits.push(val);
            break;
          case "5b6899123d1a866534f516de":
            bakery.push(val);
            break;
          case "5b675e5e5936635728f9fc30":
            beverages.push(val);
            break;
          case "5b68994e3d1a866534f516df":
            beauty.push(val);
            break;
          default:
            baby.push(val);
            break;
        }
      });
      switch (value) {
        case "fruit":
          outputData = fruits;
          break;
        case "bakeries":
          outputData = bakery;
          break;
        case "beverage":
          outputData = beverages;
          break;
        case "beauties":
          outputData = beauty;
          break;
        case "babies":
          outputData = baby;
          break;
        default:
          outputData = data;
          break;
      }
      productInterface();
    });
};

gatCurrentValue = ()=>{}


productInterface = () => {
  document.getElementById("cartModal").style.display = "none";
  document.getElementById("emptyCart").style.display = "none";
  let itemNumber = localStorage.getItem("productNumbers");
  document.getElementById("items").innerHTML =
    (itemNumber === null ? 0 : itemNumber) + " items";
    

    // const selectedValue = gatCurrentValue();
    // getRenderedValues().then((data)=>{
    //   const dataToRender = data.filter(d=>d.category === PRODUCT_KEYS[selectedValue])



    // })

  for (let i in outputData) {
    dataNew.push(outputData[i]);
    let products = document.createElement("div");
    products.className = "products";
    products.innerHTML = `<div class="w3-card-4"><p>${dataNew[i].name} </p><div class="base-header"><header class="w3-container header w3-white"><img id="image" style="margin: auto;" src='${dataNew[i].imageURL}' height="140px" width="100%"/></header><div class='base-footer'><div class='w3-container text-css'><div class='desc'>
      ${dataNew[i].description}</div></div><footer class='w3-container footer w3-white'><span id='mrp'>
      MRP Rs ${dataNew[i].price}</span><button onclick="addToCart('${dataNew[i].sku}')" style="cursor:pointer;margin-top: 4%;background-color: #c15151;;border: none;">
      Buy Now</button></footer></div></div>`;
    document.getElementById("own-products").appendChild(products);
  }
};
myFunction = () => {
  let link = document.getElementById("myLinks");
  if (link.style.display === "block") {
    link.style.display = "none";
  } else {
    link.style.display = "block";
  }
};

resizeWindow = () => {
  if (document.body.clientWidth < 500)
    window.location.href = "http://127.0.0.1:5500/views/cart.html#";
  else getCartData();
};

goToLink = (value) => {
  getRenderedValues(value);
  localStorage.setItem("productType", value);
  document.getElementById("own-products").innerHTML = "";
};

addToCart = (selectedItemName) => {
  let data = JSON.parse(localStorage.getItem("productId"));
  (function () {
    if (data === null) {
      data = data ? data.split(",") : [];
      data.push(selectedItemName);
      localStorage.setItem("productId", JSON.stringify(data));
      document.getElementById("itemNotExist").style.display = "block";
    } else {
      if (!data.includes(selectedItemName)) {
        data.push(selectedItemName);
        localStorage.setItem("productId", JSON.stringify(data));
        document.getElementById("itemNotExist").style.display = "block";
      } else document.getElementById("itemExist").style.display = "block";
    }
    localStorage.setItem("productNumbers", data === null ? 0 : data.length);
    document.getElementById("items").innerHTML =
      (data === null ? 0 : data.length) + " items";
  })();
};
getProductList = (getRenderedValues) => {
  let productType = localStorage.getItem("productItem")
    ? localStorage.getItem("productItem")
    : null;
  getRenderedValues(productType);
};

getCartData = () => {
  productId = JSON.parse(localStorage.getItem("productId"));
  if (productId !== null) {
    cartValues = [];
    renderedValues.filter((val) => {
      productId.forEach((data) => {
        if (val.sku === data) {
          cartValues.push(val);
        }
      });
    });
    cartInterface(cartValues, productId.length);
  } else {
    emptyCartInterface();
  }
};
emptyCartInterface = () => {
  document.getElementById("emptyCart").style.display = "block";
};

cartInterface = (cartValues, itemNumber) => {
  dataNew = [];
  for (let i in cartValues) {
    dataNew.push(cartValues[i]);
    let cartElement = document.createElement("card");
    cartElement.className = "cart-element";
    cartElement.innerHTML = `<img id="imgg" src="${dataNew[i].imageURL}" alt="cart-images" height="100px">
                <div> <h4 class="modal-text">${dataNew[i].name}</h4> <i onclick="increaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-plus cart-icon-class"></i>
                    <input class="itemQuantity" value="${quantity}" disabled/>
                    <i onclick="decreaseItems('${quantity}', '${dataNew[i].price}')" class="fa fa-minus cart-icon-class"></i>
                    <i class="fa fa-times" aria-hidden="true"></i>
                    <span>Rs. </span><span id="price">${dataNew[i].price} </span>
                    <div class="total-cart-cost">
                        <span>Total: Rs. </span><span class="priceNew">${dataNew[i].price} </span>
                    </div>`;
    document.querySelector(".items").appendChild(cartElement);
    cartItemInterface(itemNumber);
    document.getElementById("cartModal").style.display = "block";
  }
};
cartItemInterface = (itemNumber) => {
  document.querySelector(
    ".modal-header"
  ).innerHTML = `My Cart (${itemNumber} items) <span onclick="deleteCartData()"><i class="fa fa-trash " ></i></span>`;
};
increaseItems = (quantity, price) => {
  document.querySelector(".itemQuantity").value = ++quantity;
  document.querySelector(".priceNew").innerHTML = price * quantity;
};
decreaseItems = (selectedItem) => {
  document.querySelector(".itemQuantity").value = --quantity;
  document.querySelector(".priceNew").innerHTML = price * quantity;
};

deleteCartData = () => {
  localStorage.clear();
  closeCartModal();
  window.location.reload();
};
closeCartModal = () => {
  $(".items").empty();
  document.getElementById("cartModal").style.display = "none";
  document.getElementById("emptyCart").style.display = "none";
};
closeModal = () => {
  $("#itemNotExist").hide();
  $("#itemExist").hide();
};
window.onclick = function (event) {
  if (
    event.target == document.getElementById("itemExist") ||
    event.target == document.getElementById("itemNotExist")
  ) {
    $("#itemNotExist").hide();
    $("#itemExist").hide();
  }
  if (
    event.target == document.getElementById("cartModal") ||
    event.target == document.getElementById("emptyCart")
  ) {
    closeCartModal();
  }
};

getProductList(getRenderedValues);
