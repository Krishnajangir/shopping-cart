   export default product = function(product) {
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
                      MRP Rs ${product.price}</span><button onclick="addToCart().addProduct('${product.sku}')" style="cursor:pointer;margin-top: 4%;background-color: #c15151;;border: none;">
                      Buy Now</button></footer>
               </div>
           </div>
       </div>
   </div>`
   }