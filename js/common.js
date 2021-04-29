// MAPPING


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

increaseItems = (event) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    currentQuantity = currentQuantity || 1;
    currentQuantity = ++currentQuantity;
    document.querySelector('.itemQuantity').value = currentQuantity;
    document.querySelector('.priceNew').innerHTML = price * currentQuantity
}

decreaseItems = (event) => {
    let currentQuantity = event.currentTarget.parentElement.querySelector(".itemQuantity").value;
    let price = event.currentTarget.parentElement.querySelector(".price").innerHTML;
    if (currentQuantity !== '0') {
        currentQuantity = currentQuantity || 1;
        currentQuantity = --currentQuantity;
        document.querySelector('.itemQuantity').value = currentQuantity;
        document.querySelector('.priceNew').innerHTML = price * currentQuantity;
    }
};