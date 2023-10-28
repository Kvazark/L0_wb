const renderAvailableItemsListeners = (item, availableItems) => {
    ///////доделать эту функцию и добавить остальные

};


const parent_available_products = document.getElementById('cards-available-product')

function addProduct(product) {
    console.log(product)
    console.log(parent)
    let newElement = document.createElement("div");
    newElement.className = "available-item-cart";
    newElement.id = `item-card-${product.id}`
    newElement.innerHTML = `<div class="description-product">
                            <div class="item-image">
                                <div class="checkbox-block">
                                    <input type="checkbox" checked id=${product.id+"-item"} name=${product.id+"-item"}>
                                    <label for=${product.id+"-item"}></label>
                                </div>
                                <div class="container-item-image">
                                    <img src=${product.image} alt=""/>
                                </div>
                            </div>
                            <div class="specifications-item">
                                <h5>${product.name}</h5>
                                  <p class="item-color-and-size" id=${product.id+"-color-and-size"} style="display: none"></p>
                                <div>
                                    <p>${product.location}</p>
                                    <p>${product.provider}<span><img src="assets/icons/icon-info.svg"></span></p>
                                </div>  
                            </div>
                        </div>
                        <div class="details-product">
                        </div>`;
    parent_available_products.append(newElement)

}

products.forEach(product => {
    addProduct(product);
    addSizeAndColor(product)
});

function addSizeAndColor(product){
    const itemColorAndSize = document.getElementById(product.id+'-color-and-size')

    let colorSpan = document.createElement('span');
    let sizeSpan = document.createElement('span');
    // let boxSize = document.getElementById(product.id+'-size')
    if (product.color){
        colorSpan.textContent = `Цвет: ${product.color}`;
        itemColorAndSize.appendChild(colorSpan);
        itemColorAndSize.style.display = "flex";
    }
    if (product.size){
        sizeSpan.textContent = `Размер: ${product.size}`;
        itemColorAndSize.appendChild(sizeSpan);
        itemColorAndSize.style.display = "flex";
        // boxSize.innerHTML = product.size
    }
}



// (function() {
//     addProduct(products)
//     // products.forEach(product => {
//     //     if (product.amount > 0){
//     //         sumProducts.push({id: product.id,
//     //             price: product.price,
//     //             discount: product.discount,
//     //             quant: 1,
//     //             checked: false});
//     //         renderAvailable(product);
//     //         bucketCount++;
//     //
//     //     } else {
//     //         renderNotAvailable(product);
//     //         missingCount++
//     //     }
//     // });
//     // bucketCounter(bucketCount);
//     // renderHead()
// })();