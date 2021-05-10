class GetItemNumber {
    constructor(itemValue) {
        this.itemValue = itemValue;
    }
};

const item = new GetItemNumber(localStorage.getItem("productNumbers") || 0);
itemNumber.innerHTML = item.itemValue;

registerUser = () => {
    window.location.href = "../views/main.html";
}