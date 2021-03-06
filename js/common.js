async function getProducts() {
    return await (await fetch(PRODUCTS_END_POINT)).json().catch(() => alert('server is not running please run server first with `npm start`'))
}

window.onclick = function(event) {
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

const itemsCount = {
    totalPrice: function(price) {
        return function(quantity) {
            return quantity * price;
        }
    }
}

class GetItemNumber {
    constructor(itemValue) {
        this.itemValue = itemValue;
    }
};

const item = new GetItemNumber(localStorage.getItem("productNumbers") || 0);
itemNumber.innerHTML = item.itemValue;

const totalItemPrice = function(price, currentQuantity, selectedValue) {
    let prices = localStorage.getItem('priceValues').split(',');
    prices.forEach((val, index) => {
        if (val === selectedValue) {
            prices[index] = itemsCount.totalPrice(price)(currentQuantity).toString();
        }
    })
    document.querySelector('.totalPrice').innerHTML = 'Rs. ' + prices.reduce(addToCart().totalPrice);
}

increaseItems = (event, selectedValue) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    currentQuantity = currentQuantity || 1;
    currentQuantity = ++currentQuantity;
    event.currentTarget.parentElement.querySelector(".itemQuantity").value = currentQuantity;
    event.currentTarget.parentElement.querySelector(".priceNew").innerHTML = itemsCount.totalPrice(price)(currentQuantity);
    totalItemPrice(price, currentQuantity, selectedValue)
}

decreaseItems = (event, selectedValue) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    if (currentQuantity !== '0') {
        currentQuantity = currentQuantity || 1;
        currentQuantity = --currentQuantity;
        event.currentTarget.parentElement.querySelector(".itemQuantity").value = currentQuantity;
        event.currentTarget.parentElement.querySelector(".priceNew").innerHTML = itemsCount.totalPrice(price)(currentQuantity);
        totalItemPrice(price, currentQuantity, selectedValue)
    }
};

const addToCart = function() {
    let data = JSON.parse(localStorage.getItem("selectedCartData")) || [];
    const itemsElement = document.querySelector(".cart-item-text");

    const addProduct = function(selectedItem) {
        if (!data.includes(selectedItem)) {
            let updatedData = [...data, selectedItem];
            localStorage.setItem("selectedCartData", JSON.stringify(updatedData));
            localStorage.setItem("productNumbers", updatedData.length);
            itemsElement.innerHTML = updatedData.length;
            itemNotExist.style.display = "block";
        } else ItemExist.style.display = "block";

    };

    const removeProduct = function(selectedItem) {
        let filteredCartData = data.filter(product => product !== selectedItem);
        localStorage.setItem("selectedCartData", JSON.stringify(filteredCartData));
        localStorage.setItem("productNumbers", filteredCartData.length);
        itemsElement.innerHTML = filteredCartData.length;
        alert('Item is deleted successfully');
        getCartData();
    };

    const totalPrice = function(total, num) {
        return parseInt(total) + parseInt(num);
    }

    const proceedToBuy = function() {
        cartModal.style.display = "none";
        alert("Thankyou for doing shopping with us ,waiting for your next arrival here.");
        localStorage.clear();
        window.location.reload();
    };


    return {
        addProduct,
        removeProduct,
        proceedToBuy,
        totalPrice
    }
}
registerUser = () => {
    window.location.href = "../views/main.html";
}