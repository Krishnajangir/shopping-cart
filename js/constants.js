const PRODUCTS_END_POINT = "http://localhost:5000/products";
const CART_PATH = "../views/cart.html";
const PRODUCT_PATH = "../views/products.html";
const CATEGORIES_END_POINT = "http://localhost:5000/categories";


const PRODUCT_KEYS = {
    fruit: "5b6899953d1a866534f516e2",
    bakeries: "5b6899123d1a866534f516de",
    beverage: "5b675e5e5936635728f9fc30",
    beauties: "5b68994e3d1a866534f516df",
    babies: "5b6899683d1a866534f516e0",
};

const EXPLORE_TYPE = {
    'fruit-and-veg': 'fruit',
    'bakery-cakes-dairy': 'bakeries',
    'beverages': 'beverage',
    'beauty-hygiene': 'beauties',
    'baby': 'babies',

}


const itemNotExist = document.getElementById("itemNotExist");
const ItemExist = document.getElementById("itemExist");
const cartModal = document.getElementById("cartModal");
const itemNumber = document.querySelector(".item-number");