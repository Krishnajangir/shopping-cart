 class Templates {
     product = function(product) {
         return ` <div class="products">
         <div class="w3-card-4">
           <p>${product.name} </p>
           <div class='base-header'>
               <header class="w3-container header w3-white"><img id="image" style="margin: auto;" src='${product.imageURL}' height="140px" width="100%" /></header>
               <div class='base-footer'>
                   <div class='w3-container text-css'>
                    <div class="desc">
                           ${product.description}</div>
                   </div>
                    <footer class="w3-container footer w3-white"><span id="mrp">
                      MRP Rs ${product.price}</span><button class="btn-prop" onclick="addToCart().addProduct('${product.sku}')">
                      Buy Now</button></footer>
               </div>
           </div>
       </div>
   </div>`
     };

     evenCategory = function(category) {
         return `<div class="badge">
         <div class="w3-panel w3-card">
           <img
             class="odd-img"
             src="${category.imageUrl}"
           />
           <div class="own-category-info">
             <h1>${category.name}</h1>
             <p>${category.description}</p>
             <button onclick='goToProductsList("${category.key}")' id="explore">
               Explore ${category.key}
             </button>
           </div>
         </div>
         <hr class="bottom-shadow-line">
       </div>`
     };

     oddCategory = function(category) {
         return `<div class="w3-panel w3-card" >
        <div class="own-category-info even-text">
            <h1>
                ${category.name}</h1>
            <p>
                ${category.description} </p><button onclick='goToProductsList("${category.key}")' id='explore'>
                Explore
                ${category.key}
            </button>
        </div> <img class="even-img" src='${category.imageUrl}' height="30%" width="30%" />
    </div>
    <hr class='bottom-shadow-line'>
    </div>`
     }

     cartItem = function(cartData, quantity) {
         return `<div class="cart-element">
         <img id="imgg" src="${cartData.imageURL}" alt="cart-images" height="100px" />
         <divb class="cart-item-detail">
           <h4 class="modal-text">${cartData.name}</h4>
           <i
             onclick="increaseItems(event , '${cartData.price}')"
             class="fa fa-plus cart-icon-class"
           ></i>
           <input class="itemQuantity" value="${quantity}" disabled />
           <i
             onclick="decreaseItems(event , '${cartData.price}')"
             class="fa fa-minus cart-icon-class"
           ></i>
           <i class="fa fa-times" aria-hidden="true"></i>
         <span>Rs. </span><span class="price">${cartData.price} </span>
           <div class="total-cart-cost">
             <span>Total: Rs. </span><span class="priceNew">${cartData.price} </span>
           </div>
         </divb><span onclick="addToCart().removeProduct('${cartData.sku}')"><i class="fa fa-trash " ></i></span>
       </div>`;
     }

 }