const PRODUCTS_END_POINT = "http://localhost:5000/products";

let dataNew = [];
fruits = [];
bakery = [];
beverages = [];
beauty = [];
baby = [];
outputData = [];
let renderedValues = [];
getRenderedValues = (value) => {
  fetch(PRODUCTS_END_POINT)
    .then((response) => {
      return response.json();
    }).catch(() => {
       alert('server is not running please run server first with `npm start`')
    })
    .then((data) => {
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

productInterface = () => {
  for (let i in outputData) {
    dataNew.push(outputData[i]);
    let products = document.createElement("div");
    products.className = "products";
    products.innerHTML = `<div class="w3-card-4"><p>${dataNew[i].name} </p><div class="base-header"><header class="w3-container header w3-white"><img id="image" style="margin: auto;" src='${dataNew[i].imageURL}' height="140px" width="100%"/></header><div class='base-footer'><div class='w3-container text-css'><div class='desc'>
      ${dataNew[i].description}</div></div><footer class='w3-container footer w3-white'><span id='mrp'>
      MRP Rs ${dataNew[i].price}</span><button onclick="buyNow('${dataNew[i].sku}')" style="cursor:pointer;margin-top: 4%;background-color: #c15151;;border: none;">
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

goToLink = (value) => {
  getRenderedValues(value);
  localStorage.setItem("productType", value);
  document.getElementById("own-products").innerHTML = "";
};

buyNow = (selectedItemName) => {
  let data = JSON.parse(localStorage.getItem("productId"));
  if(data === null) {
    data = data ? data.split(",") : [];
    data.push(selectedItemName);
    localStorage.setItem("productId", JSON.stringify(data));
    document.getElementById('itemNotExist').style.display = "block";
  } else {
    if(!data.includes(selectedItemName)) {
      data.push(selectedItemName);
      localStorage.setItem("productId", JSON.stringify(data));
      document.getElementById('itemNotExist').style.display = "block";
    }
    else document.getElementById('itemExist').style.display = "block";
}
};
getProductList = (getRenderedValues) => {
  let productType = localStorage.getItem("productItem")
    ? localStorage.getItem("productItem")
    : null;
  getRenderedValues(productType);
};

closeModal = () => {
   $('#itemNotExist').hide();
   $('#itemExist').hide();
}
window.onclick = function(event) {
  if (event.target == document.getElementById('itemExist') || event.target == document.getElementById('itemNotExist')) {
    $('#itemNotExist').hide();
    $('#itemExist').hide();
  }
}


getProductList(getRenderedValues);


