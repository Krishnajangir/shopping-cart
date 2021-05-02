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

// currying example
const itemsCount = {
    totalPrice: function(price) {
        return function(quantity) {
            return quantity * price;
        }
    }
}

increaseItems = (event) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    currentQuantity = currentQuantity || 1;
    currentQuantity = ++currentQuantity;
    document.querySelector('.itemQuantity').value = currentQuantity;
    document.querySelector('.priceNew').innerHTML = itemsCount.totalPrice(price)(currentQuantity)
}

decreaseItems = (event) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    if (currentQuantity !== '0') {
        currentQuantity = currentQuantity || 1;
        currentQuantity = --currentQuantity;
        document.querySelector('.itemQuantity').value = currentQuantity;
        document.querySelector('.priceNew').innerHTML = itemsCount.totalPrice(price)(currentQuantity);
    }
};

const addToCart = function() {
    let data = JSON.parse(localStorage.getItem("selectedCartData")) || [];

    const addProduct = function(selectedItem) {
        if (!data.includes(selectedItem)) {
            let updatedData = [...data, selectedItem];
            localStorage.setItem("selectedCartData", JSON.stringify(updatedData));
            localStorage.setItem("productNumbers", updatedData.length);
            document.getElementById("items").innerHTML = updatedData.length + " items";
            document.getElementById("itemNotExist").style.display = "block";
        } else document.getElementById("itemExist").style.display = "block";

    };

    const removeProduct = function(selectedItem) {
        let filteredCartData = data.filter(product => product !== selectedItem);
        localStorage.setItem("selectedCartData", JSON.stringify(filteredCartData));
        localStorage.setItem("productNumbers", filteredCartData.length);
        document.getElementById("items").innerHTML = filteredCartData.length + " items";
        alert('Item is deleted successfully');
        getCartData();
    };

    const proceedToBuy = function() {
        document.getElementById("cartModal").style.display = "none";
        alert("Thankyou for doing shopping with us ,waiting for your next arrival here.");
        localStorage.clear();
        window.location.reload();
    };

    return {
        addProduct,
        removeProduct,
        proceedToBuy
    }
}