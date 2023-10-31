const parent_available_products = document.getElementById('available-products-list')
function renderAvailableProduct(product) {
    console.log(product)
    console.log(parent)
    let updateProvider = changeProvider(product.provider)
    let newElement = document.createElement("div");
    newElement.className = "item-cart";
    newElement.id = `${product.id}`
    newElement.innerHTML = `<div class="description-product">
                            <div class="item-image">
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
                                    <p class="get-info-popup">${product.provider}<span><img src="assets/icons/icon-info.svg"/></span></p>
                                    <section class="popup-info">
                                        <h4>${updateProvider}</h4>
                                        <span>ОГРН: ${product.OGRN}</span>
                                        <span>${product.address}</span>
                                    </section>
                                </div>  
                            </div>
                        </div>
                        <div class="details-product">
                        </div>`;
    parent_available_products.append(newElement)
  //  addDescription(product);
    renderPrice(product, sumProducts);
    addSizeAndColor(product);
    checkCheckbox(product.id);
}
// products.forEach(product => {
//     renderAvailableProduct(product);
//     addSizeAndColor(product)
// });

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
////////////////////////////////////////////////////////////////////

const cartCircle = document.getElementById('cart-counter')
const missingProducts = document.getElementById('missing-products-list')
////это для мобилки
const bucketNav = document.getElementById('bucket-counter-nav')

let sumProducts = [];
let cartCount = 0;
var missingCount = 0;


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
                checked: false});
            renderAvailableProduct(product);
            cartCount++;

        } else {
            renderNotAvailable(product);
            missingCount++
        }
    });
    cartCountCircle(cartCount);
    renderHead()
})();



function cartCountCircle(n){
    if (n > 0){
        cartCircle.style.display = 'block';
        cartCircle.innerHTML = n
     //   bucketNav.style.display = 'block';
     //   bucketNav.innerHTML = n
    } if (n === products.length){
        let block = document.getElementById('notavail-control');
        block.classList.toggle('hide')
        block.nextElementSibling.classList.toggle('hide')
    } if (n === 0) {
        let block = document.getElementById('avail-control');
        cartCircle.style.display = 'none';
        cartCircle.innerHTML = "";
       // bucketNav.style.display = 'none';
      //  bucketNav.innerHTML = "";
       // block.classList.toggle('hide')
      //  block.nextElementSibling.classList.toggle('hide')
    }
}

// function renderAvailable(product){
//     let seller = renderSeller(product.seller);
//     let div = document.createElement('div');
//     div.className = "product__panel";
//     div.id = product.id;
//     div.innerHTML = '<div class="product__panel-card">' +
//         '               <div class="product__panel-check">' +
//         '                   <input type="checkbox" id="'+product.id+'-check" onclick="addCheck(id)">' +
//         '                   <label for="'+product.id+'-check"></label>' +
//         '                   <span id="'+  product.id +'-size"></span>' +
//         '               </div>' +
//         '               <img src="'+ product.photo +'" alt="'+product.name+'">' +
//         '               <div class="product__panel-description">' +
//         '                   <h4>'+ product.name + '</h4>' +
//         '                   <div id="'+product.id+'-description" class="product__panel-description__add"></div>' +
//         '                   <div class="dropdown">' +
//         '                       <span class="loc">'+product.location+'</span>' +
//         '                       <br>' +
//         '                       <span class="mob">'+product.seller+'</span>' +
//         '                       <span class="info" id="'+product.id+'-seller-info" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">i</span>' +
//         '                       <div class="info__content" id="'+product.id+'-seller-info-content">' +
//         '                           <span><b>'+seller+'</b></span><br>' +
//         '                           <span>ОГРН: '+product.OGRN+'</span>' +
//         '                           <p>'+product.address+'</p>' +
//         '                       </div>' +
//         '                   </div>' +
//         '               </div>' +
//         '           </div>';
//     avail.append(div)
//     addDescription(product);
//     renderPrice(product, sumProducts);
//     checkCheckbox(product.id);
// }

function renderPrice(product){
    let count = 0;
    let price = 0;
    let discontprice = 0;
    sumProducts.forEach(elem => {
        if (elem.id === product.id){
            count = elem.quantity;
            price = count * elem.price;
            // discontprice = (price * (100 - (elem.discount + person.discount)))/100;
            discontprice = (price * (100 - (elem.discount)))/100;
        }
    })
    let divPrice = document.getElementById(`${product.id}`);
    let div = document.createElement('div');
    div.className = "details-product";
    div.id = product.id+'-price';
    div.innerHTML = `<div class="details-count-product">
                                    <div class="counter-btn">
                                        <button class="counter-btn-grey" id=${product.id+"-minus"} onclick="minus(id)"><span>–</span></button>
                                        <input type="number" maxlength="2" min="1" value="1" id="quantity-item-"/>
                                        <button id=${product.id+"-plus"} onclick="plus(id)"><span>+</span></button>
                                    </div>
                                    <div class="fav-del-product" id=${product.id+"-price-icons"}>
                                        <button id="to_favorite">
                                            <img src="assets/icons/to_favourites.svg"/>
                                        </button>
                                        <button id="to-delete">
                                            <img src="assets/icons/delet.svg"/>
                                        </button>
                                    </div>
                                </div>
                                <div class="details-price-product">
                                    <h3 class="final-price-product" id=${product.id+"-sum"}><span> сом</span></h3>
                                    <p class="full-price-product">id=${product.id+"-sum"}<span> сом</span></p>
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
    sizeCheck(product.id, discontprice);
    addLikeAndTrash(product.id);
}

///////потом
function renderNotAvailable(product){
    let div = document.createElement('div');
    div.className = "item-cart";
    div.id = product.id;
    div.innerHTML = `<div class="description-product">
                            <div class="item-image">
                                <div class="container-item-image">
                                    <img src=${product.image} alt="" style="-webkit-filter: grayscale(100%); filter: grayscale(100%);"/>
                                </div>
                            </div>
                            <div class="specifications-item" style="width: 18rem !important;">
                                <h5 style="color: var(--gray-blue)">${product.name}</h5>
                                  <p class="item-color-and-size" style="color: var(--gray-blue)" id=${product.id + "-color-and-size"} style="display: none"></p>
                            </div>
                            <div class="fav-del-not-avail-product" id=${product.id+"-price-icons"}>
                                        <button id="to_favorite">
                                            <img src="assets/icons/to_favourites.svg"/>
                                        </button>
                                        <button id="to-delete">
                                            <img src="assets/icons/delet.svg"/>
                                        </button>
                            </div>
                        </div>`
    // div.innerHTML = '<div class="product__panel-card">' +
    //     '               <img src="'+ product.photo +'" alt="'+product.name+'">' +
    //     '               <div class="product__panel-description">' +
    //     '                   <h4>'+ product.name + '</h4>' +
    //     '                   <div id="'+product.id+'-description" class="product__panel-description__add"></div>' +
    //     '               </div>' +
    //     '           </div>' +
    //     '           <div class="notavailble-icons">' +
    //     '               <div class="price__icons" id="'+product.id+'-price-icons">' +
    //     '                   '+like+''+trash+'' +
    //     '               </div>' +
    //     '           </div>';
    missingProducts.append(div);
    addSizeAndColor(product);
    //addLikeAndTrash(product.id)
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

// function addDescription(product){
//     const description = document.getElementById(product.id+'-description')
//     let spanColor = document.createElement('span');
//     let spanSize = document.createElement('span');
//     let boxSize = document.getElementById(product.id+'-size')
//     if (product.color){
//         spanColor.innerHTML = 'Цвет: '+ product.color;
//         description.append(spanColor);
//     }
//     if (product.size){
//         spanSize.innerHTML = 'Размер: '+ product.size;
//         description.append(spanSize);
//         boxSize.innerHTML = product.size
//         boxSize.classList = 'boxsize mob-show'
//     }
// }

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

let timeout, interval;

function clearTimers(){
    clearTimeout(timeout);
    clearInterval(interval);
    //getDeliveryProducts()
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
           // calculate()
            if (elem.quantity > 0) {
                timeout = setTimeout(() => {
                    interval = setInterval(() => {
                        elem.quantity--
                        let divPrice = document.getElementById(productMinus.id);
                        let div = document.getElementById(productMinus.id + '-price');
                        divPrice.removeChild(div);
                        renderPrice(productMinus);
                        calculate()
                        if (elem.quantity === 1) {
                            clearTimers();
                        }
                    }, 100)
                }, 200)
            }
        }
    })
    //getDeliveryProducts()
    //calculate();
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
            elem.quantity++
            let divPrice = document.getElementById(productPlus.id);
            let div = document.getElementById(productPlus.id+'-price');
            divPrice.removeChild(div);
            renderPrice(productPlus);
           // calculate()
            timeout = setTimeout(()=>{
                interval = setInterval(()=>{
                    elem.quantity++
                    let divPrice = document.getElementById(productPlus.id);
                    let div = document.getElementById(productPlus.id + '-price');
                    divPrice.removeChild(div);
                    renderPrice(productPlus);
                   // calculate()
                    if (elem.quantity >= productPlus.amount){
                        elem.quantity = productPlus.amount - 1
                    }
                },100)
            },200)
            if (elem.quantity === productPlus.amount){
                clearTimers();

            }
        }
    });
    //getDeliveryProducts()
    //calculate();
}

function deleteFromBucket(el){
    let elId = el.parentElement.id;
    let arr = elId.split('-');
    deleteFromArr(products, +arr[0])
    deleteFromArr(sumProducts, +arr[0])
    cartCount = 0;
    missingCount = 0;
    document.getElementById('available_list').innerHTML = '';
    document.getElementById('notavailable_list').innerHTML = '';
    checkupProducts();
    //getDeliveryProducts()
    //calculate();
}

function deleteFromArr(arr, id){
    arr.forEach( element =>{
        if (element.id === id) {
            let index = arr.indexOf(element);
            if (index >= 0) {
                arr.splice(index, 1);
            }
        }
    })
}

function checkupProducts (){
    products.forEach(product => {
        if (product.amount > 0){
            renderAvailable(product);
            cartCount++;
        } else {
            renderNotAvailable(product);
            missingCount++;
        }
    });
    cartCountCircle(cartCount);
    renderHead(missingCount)
    verificationCheck()
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
    if (arr.length > 6){
        sum.style.fontSize = '16px'
    } else {
        sum.style.fontSize = '20px'
        sum.style.lineHeight = '28px'
    }
    if (window.innerWidth <= 1029){
        sum.style.fontSize = '16px'
    }
}

function addLikeAndTrash(id){
    let addTrash = document.getElementById(id+'-price-icons').childNodes[2]
    addTrash.addEventListener('click', ()=> deleteFromBucket(addTrash))
}

function addCheck(el){
    let id = Number(el.replace(/[^\d]/g, ''));
    sumProducts.forEach(elem =>{
        if (elem.id === id)
            elem.checked = !elem.checked;
    })
    verificationCheck()
    //calculate()
}

function checkCheckbox(id){
    sumProducts.forEach(el => {
        if (el.id === id && el.checked){
            document.getElementById(id+'-check').checked = true
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
    getDeliveryProducts()
    calculate()
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
    getDeliveryProducts()
}