const cartCircle = document.getElementById('cart-counter')
const cartCircleMob = document.getElementById('cart-counter-mob')
const availableProducts = document.getElementById('available-products-list')
const missingProducts = document.getElementById('missing-products-list')
////это для мобилки
const bucketNav = document.getElementById('bucket-counter-nav')

var sumProducts = [];
var cartCount = 0;
var missingCount = 0;

function renderAvailableProduct(product) {
    let updateProvider = changeProvider(product.provider)
    let newElement = document.createElement("div");
    newElement.className = "item-cart";
    newElement.id = `${product.id}`
    newElement.innerHTML = `<div class="description-product">
                            <div class="item-image" id="${product.id + "-item-image"}">
                                <div class="checkbox-block">
                                    <input type="checkbox" checked id=${product.id + "-checkbox"} name=${product.id + "-item"} onclick="addCheck(id)">
                                    <label for=${product.id + "-checkbox"}></label>
                                </div>
                                <div class="container-item-image">
                                    <img src=${product.image} alt=""/>
                                </div>
                            </div>
                            <div class="specifications-item">
                                <h5>${product.name}</h5>
                                  <p class="item-color-and-size" id=${product.id + "-color-and-size"} style="display: none"></p>
                                <div>
                                    <p>${product.location}</p>
                                    <p class="get-info-popup">${product.provider}<span><img src="src/assets/icons/icon-info.svg"/></span></p>
                                    <section class="popup-info">
                                        <h4>${updateProvider}</h4>
                                        <span>ОГРН: ${product.OGRN}</span>
                                        <span>${product.address}</span>
                                    </section>
                                </div>  
                            </div>
                        </div>`;
    availableProducts.append(newElement)
    renderPrice(product, sumProducts);
    addSizeAndColor(product);
    checkCheckbox(product.id);
}

function renderPrice(product){
    let count = 0;
    let price = 0;
    let discountPrice = 0;
    let discountProduct =0;
    let discountPersonal = 0;
    sumProducts.forEach(elem => {
        if (elem.id === product.id){
            count = elem.quantity;
            price = count * elem.price;
            discountPrice = (price * (100 - (elem.discount + personalData.discount)))/100;
            discountProduct = parseInt(price - ((price * (100 - elem.discount))/100));
            discountPersonal = parseInt(price - ((price * (100 - personalData.discount))/100));
        }
    })
    let divPrice = document.getElementById(`${product.id}`);
    let div = document.createElement('div');
    div.className = "details-product";
    div.id = product.id+'-price';
    div.innerHTML = `<div class="details-count-product">
                         <div class="counter-btn">
                             <button id=${product.id+"-minus"} onclick="minus(id)"><span>–</span></button>
                             <input type="number" maxlength="2" min="1" value="${count}" id={"quantity-item-"+product.id}/>
                             <button id=${product.id+"-plus"} onclick="plus(id)"><span>+</span></button>
                         </div>
                         <div class="fav-del-product" id=${product.id+"-price-icons"}>
                             <button id="to_favorite">
                                   <svg class="to_favorite" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z" fill="black"/>
                                   </svg>
                             </button>
                             <div id="to_delete" onclick="deleteFromBucket(${product.id}, 'available')"/>
                                 <svg class="to_delete" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                                 </svg>
                             </div>
                         </div>
                    </div>
                    <div class="details-price-product">
                        <h3>
                            <span id=${product.id+"-sum"} class="final-price-1">${parseInt(discountPrice).toLocaleString()}&nbsp</span>
                            <span class="final-price-2"> сом</span>
                        </h3>
                        <p class="full-price-p" id=${product.id+"-sum"}>
                            <span>${parseInt(price).toLocaleString()} сом</span>
                        </p>
                        <div class="popup-price-info">
                            <p>Скидка ${product.discount}% <span>−${discountProduct} сом</span></p>
                            <p>Скидка покупателя ${personalData.discount}% <span>−${discountPersonal} сом</span></p>
                        </div>
                    </div>`
    // div.innerHTML = '<div class="product__panel-price__manage">' +
    //     '   <div class="count">' +
    //     '       <span id="'+product.id+'-minus" onmousedown="minus(id);" onmouseup="clearTimers()" onmouseout="clearTimers()" >−</span> <span>'+count+'</span> <span id="'+product.id+'-plus" onmousedown="plus(id) " onmouseup="clearTimers()" onmouseout="clearTimers()">+</span>' +
    //     '   </div>' +
    //     '   <div class="price__icons" id="'+product.id+'-price-icons">' +
    //     '       '+like+''+trash+''+
    //     '   </div>' +
    //     '</div>'+
    //     '<div class="price__block">' +
    //     '   <span id="'+product.id+'-sum" class="price__block-disprice">'+parseInt(discontprice).toLocaleString()+'</span><span class="price__block-curr"> сом</span><br class="mob">' +
    //     '   <div id="'+product.id+'-price-info" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">' +
    //     '       <span style="font-weight: 400; font-size: 13px">'+parseInt(price).toLocaleString()+'</span><span style="font-weight: 400; font-size: 13px"> сом</span>' +
    //     '   </div>' +
    //     '   <div class="info__content" id="'+product.id+'-price-info-content">' +
    //     '       <div class="discount"><span>Скидка '+product.discount+'%</span><span>-'+(product.price * (product.discount / 100)).toFixed(0)+' сом</span></div>' +
    //     // '       <div class="discount"><span>Скидка покупателя '+person.discount+'%</span><span>-'+(product.price * (person.discount / 100)).toFixed(0)+' сом</span></div>' +
    //     '   </div>' +
    //     '</div>';

    divPrice.append(div);
    if (count === product.countOnWarehouse){
        document.getElementById(product.id+'-plus').style.color = 'rgba(0, 0, 0, 0.2)'
        document.getElementById(product.id+'-plus').style.cursor = 'default'
    }
    if (count === 1){
        document.getElementById(product.id+'-minus').style.color = 'rgba(0, 0, 0, 0.2)'
        document.getElementById(product.id+'-minus').style.cursor = 'default'
    }
    quantCheck(product.countOnWarehouse, product.id);
    sizeCheck(product.id, discountPrice);
    // addLikeAndTrash(product.id);
}

function addSizeAndColor(product){
    const itemColorAndSize = document.getElementById(product.id+'-color-and-size');
    const itemImageBlock = document.getElementById(product.id+'-item-image')
    let colorSpan = document.createElement('span');
    let sizeSpan = document.createElement('span');
    let sizeMob = document.createElement('div');
    sizeMob.className = 'size-mob-block';
    if (product.color){
        colorSpan.textContent = `Цвет: ${product.color}`;
        itemColorAndSize.appendChild(colorSpan);
        itemColorAndSize.style.display = "flex";
    }
    if (product.size){
        sizeSpan.textContent = `Размер: ${product.size}`;
        sizeMob.innerHTML=`${product.size}`;
        if(itemImageBlock)         itemImageBlock.appendChild(sizeMob);
        itemColorAndSize.appendChild(sizeSpan);
        itemColorAndSize.style.display = "flex";
    }
}
function renderNotAvailable(product){
    let div = document.createElement('div');
    div.className = "item-cart";
    div.id = product.id;
    div.innerHTML = `<div class="description-product-missing" 
                            id=${product.id+"-description-product-missing"}>
                            <div class="description-product">
                                <div class="item-image">
                                    <div class="container-item-image">
                                        <img src=${product.image} alt="" style="-webkit-filter: grayscale(100%); filter: grayscale(100%);"/>
                                    </div>
                                </div>
                                <div class="specifications-item" style="width: 18rem !important;">
                                    <h5 style="color: var(--gray-blue)">${product.name}</h5>
                                    <p class="item-color-and-size" style="color: var(--gray-blue)" id=${product.id + "-color-and-size"} style="display: none"></p>
                                </div>
                            </div>   
                            <div class="fav-del-not-avail-product" id=${product.id+"-price-icons"}>
                                <div id="to_favorite">
                                    <svg class="to_favorite" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.03399 4.05857C2.26592 4.75224 1.76687 5.83284 1.99496 7.42928C2.22335 9.02783 3.26497 10.6852 4.80439 12.3478C6.25868 13.9184 8.10965 15.4437 9.99999 16.874C11.8903 15.4437 13.7413 13.9184 15.1956 12.3478C16.7351 10.6852 17.7767 9.02783 18.005 7.4293C18.2331 5.83285 17.734 4.75224 16.9659 4.05856C16.1767 3.34572 15.055 3 14 3C12.132 3 11.0924 4.08479 10.5177 4.68443C10.4581 4.7466 10.4035 4.80356 10.3535 4.85355C10.1583 5.04882 9.84169 5.04882 9.64643 4.85355C9.59644 4.80356 9.54185 4.7466 9.48227 4.68443C8.9076 4.08479 7.868 3 5.99999 3C4.94498 3 3.82328 3.34573 3.03399 4.05857ZM2.36374 3.31643C3.37372 2.40427 4.75205 2 5.99999 2C8.07126 2 9.34542 3.11257 9.99999 3.77862C10.6545 3.11257 11.9287 2 14 2C15.2479 2 16.6262 2.40428 17.6362 3.31644C18.6674 4.24776 19.2669 5.66715 18.995 7.5707C18.7233 9.47217 17.515 11.3148 15.9294 13.0272C14.3355 14.7486 12.3064 16.3952 10.3 17.9C10.1222 18.0333 9.87776 18.0333 9.69999 17.9C7.69356 16.3952 5.66446 14.7485 4.07063 13.0272C2.48506 11.3148 1.27668 9.47217 1.00501 7.57072C0.733043 5.66716 1.33253 4.24776 2.36374 3.31643Z" fill="black"/>
                                    </svg>
                                </div>
                                <div id="to-delete" onclick="deleteFromBucket(${product.id}, 'missing')">
                                    <svg class="to_delete"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                                    </svg>
                                </div>
                            </div>
                        </div>`
    missingProducts.append(div);
    addSizeAndColor(product);
    // addLikeAndTrash(product.id)
}

function dropAvail() {
    if(document.getElementById("available-products-list").style.display === 'none'){
        document.getElementById("available-products-list").style.display = 'flex';
        document.getElementById("dropbtn-avail").classList.toggle("close")
    }else{
        document.getElementById("available-products-list").style.display = 'none';
        document.getElementById("dropbtn-avail").classList.toggle("close")
    }
}

function dropNotAvail(){
    if(document.getElementById("missing-products-list").style.display === 'none'){
        document.getElementById("missing-products-list").style.display = 'flex';
        document.getElementById("dropbtn-miss").classList.toggle("close")
    }else{
        document.getElementById("missing-products-list").style.display = 'none';
        document.getElementById("dropbtn-miss").classList.toggle("close")
    }
}

(function() {
    products.forEach(product => {
        if (product.countOnWarehouse > 0){
            sumProducts.push({id: product.id,
                price: product.price,
                discount: product.discount,
                quantity: 1,
                checked: true});
            renderAvailableProduct(product);
            cartCount++;

        } else {
            renderNotAvailable(product);
            missingCount++
        }
    });
    cartCountCircle(cartCount);
    renderHead();
    verificationCheck();
    getDeliveryProducts();
})();

function cartCountCircle(n){
    if (n > 0){
        cartCircle.style.display = 'block';
        cartCircle.innerHTML = n;
        cartCircleMob.style.display = 'block';
        cartCircleMob.innerHTML = n;
    } if (n === products.length){
        let block = document.getElementById('notavail-control');
        block.classList.toggle('hide')
        block.nextElementSibling.classList.toggle('hide')
    } if (n === 0) {
        cartCircle.style.display = 'none';
        cartCircle.innerHTML = "";
        cartCircleMob.style.display = 'none';
        cartCircleMob.innerHTML = "";
    }
}

function renderHead(){
    if (missingCount > 0) {
        let first_word;
        let second_word;
        if (missingCount === 1) {
            first_word = 'Отсутствует'
        } else {
            first_word = 'Отсутствуют'
        }
        let words_arr = ['товар', 'товара', 'товаров'];
        second_word = normalizeCountForm(missingCount, words_arr)
        document.getElementById('missing-head').innerHTML = first_word + '<span> · </span>' + missingCount + ' ' + second_word
    }
}
function normalizeCountForm (number, words_arr) {
    number = Math.abs(number);
    if (Number.isInteger(number)) {
        let options = [2, 0, 1, 1, 1, 2];
        return words_arr[(number % 100 > 4 && number % 100 < 20) ? 2 : options[(number % 10 < 5) ? number % 10 : 5]];
    }
    return words_arr[1];
}
function changeProvider(line){
    let arr = line.split(' ');
    let provider = "";
    const item = '"';
    if (arr[0] === "OOO"){
        for (let i=1; i<arr.length; i++){
            arr[i] = arr[i].toUpperCase();
        }
        arr.splice(1, 0, item);
        arr.push(item)

    }
    for (let i=0; i<arr.length; i++){
        if (arr[i] !== item && i < arr.length - 2){
            provider += arr[i] + " ";
        } else {
            provider += arr[i];
        }
    }
    return provider;
}

function minus(idMinus){
    let id = Number(idMinus.replace(/[^\d]/g, ''));
    let productMinus;
    products.forEach(product =>{
        if (product.id === id){
            productMinus = product;
        }
    });
    sumProducts.forEach(elem => {
        if (elem.id === id && elem.quantity !== 1){
            elem.quantity--
            let divPrice = document.getElementById(productMinus.id);
            let div = document.getElementById(productMinus.id + '-price');
            divPrice.removeChild(div);
            renderPrice(productMinus);
            calculation();
            getProducts(elem);
        }
    })
    getDeliveryProducts();
    getProducts();
    calculation();
}
function plus(idPlus){
    let id = Number(idPlus.replace(/[^\d]/g, ''));
    let productPlus;
    let amount;
    products.forEach(product =>{
        if (product.id === id){
            productPlus = product;
            amount = product.countOnWarehouse;
        }
    });
    sumProducts.forEach(elem => {
        if (elem.id === id && elem.quantity !== amount){
            elem.quantity++;
            let divPrice = document.getElementById(productPlus.id);
            let div = document.getElementById(productPlus.id+'-price');
            divPrice.removeChild(div);
            renderPrice(productPlus);
            calculation();
            getProducts(elem);
        }
    });
    getDeliveryProducts();
    calculation();
}

function deleteFromBucket(id, type){
    var element = document.getElementById(id);
    if (element) {
        element.remove();
    }
    var index = sumProducts.findIndex(function(item) {
        return item.id === id;
    });
    if(type==='missing') missingCount --;
    else if(type==='available') cartCount--;
    if (index !== -1) {
        sumProducts.splice(index, 1);
    }
    cartCountCircle(cartCount);
    renderHead();
    calculation();
    getDeliveryProducts();
}
function deleteAddress(id, type){
    var element = document.getElementById(id);
    if (element) {
        element.remove();
    }
    if(type==='courier') {
        var index = personalData.addresses.findIndex(function(item) {
            return item.id === id;
        });
        if (index !== -1) {
            personalData.addresses.splice(index, 1);
        }

    }
    else if(type==='pickUpPoint'){
        var index = personalData.pickupPoints.findIndex(function(item) {
            return item.id === id;
        });
        if (index !== -1) {
            personalData.pickupPoints.splice(index, 1);
        }
    }

    //
    // cartCountCircle(cartCount);
    // renderHead();
    // calculation();
    // getDeliveryProducts();
}
function quantCheck(amount, id){
    if (amount <= 10){
        let span = document.createElement('p');
        span.innerHTML = 'Осталось '+ amount +' шт.'
        span.classList.add('item-remain');
        document.getElementById(id+'-price').childNodes[0].childNodes[1].after(span);
    }
}

function sizeCheck(id, price){
    let sum = document.getElementById(id+'-sum');
    let arr = String(price).split('');
    if (arr.length > 9){
        sum.style.fontSize = '16px'
    } else {
        sum.style.fontSize = '20px'
        sum.style.lineHeight = '28px'
    }
    if (window.innerWidth <= 1029){
        sum.style.fontSize = '16px'
    }
}

// function addLikeAndTrash(id){
//     let addTrash = document.getElementById(id+'-price-icons').childNodes[2]
//     console.log(addTrash)
//     addTrash.addEventListener('click', ()=> deleteFromBucket(addTrash))
// }

function addCheck(el){
    let id = Number(el.replace(/[^\d]/g, ''));
    sumProducts.forEach(elem =>{
        if (elem.id === id)
            elem.checked = !elem.checked;
    })
    verificationCheck();
    calculation();
}

function checkCheckbox(id){
    sumProducts.forEach(el => {
        if (el.id === id && el.checked){
            document.getElementById(id+'-checkbox').checked = true
        }
    })

}

function addAllCheck(){
    let check = document.getElementById('cart_all')
    sumProducts.forEach(elem =>{
        elem.checked = !!check.checked;
    })
    sumProducts.forEach(elem =>{
        let checkbox = document.getElementById(elem.id+'-checkbox')
        checkbox.checked = !!check.checked;
    })
    getDeliveryProducts();
    calculation();
}

function verificationCheck(){
    let i = 0;
    let check = document.getElementById('cart_all')
    sumProducts.forEach(elem =>{
        let checkbox = document.getElementById(elem.id+'-checkbox')
        if (checkbox.checked){
            i++
        }
    })
    if (i === sumProducts.length){
        check.checked = true
    }
    if (i < sumProducts.length){
        check.checked = false
    }
    getDeliveryProducts();
}

