const parent_available_products = document.getElementById('available-products-list')
function renderAvailableProduct(product) {
    console.log(product)
    console.log(parent)
    let newElement = document.createElement("div");
    newElement.className = "available-item-cart";
    newElement.id = `item-card-${product.id}`
    newElement.innerHTML = `<div class="description-product">
                            <div class="item-image">
                                <div class="checkbox-block">
                                    <input type="checkbox" checked id=${product.id+"-checkbox"} name=${product.id+"-item"} onclick="addCheck(id)">
                                    <label for=${product.id+"-checkbox"}></label>
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
  //  addDescription(product);
   // renderPrice(product, sumProducts);
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
const missingProducts = document.getElementById('missing-products')
////это для мобилки
const bucketNav = document.getElementById('bucket-counter-nav')

let sumProducts = [];
let cartCount = 0;
let missingCount = 0;

const like = '<svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M3.03396 2.05857C2.26589 2.75224 1.76684 3.83284 1.99493 5.42928C2.22332 7.02783 3.26494 8.68522 4.80436 10.3478C6.25865 11.9184 8.10962 13.4437 9.99996 14.874C11.8903 13.4437 13.7413 11.9184 15.1956 10.3478C16.735 8.68521 17.7766 7.02783 18.005 5.4293C18.233 3.83285 17.734 2.75224 16.9659 2.05856C16.1766 1.34572 15.055 1 14 1C12.1319 1 11.0923 2.08479 10.5177 2.68443C10.4581 2.7466 10.4035 2.80356 10.3535 2.85355C10.1582 3.04882 9.84166 3.04882 9.6464 2.85355C9.59641 2.80356 9.54182 2.7466 9.48224 2.68443C8.90757 2.08479 7.86797 1 5.99995 1C4.94495 1 3.82325 1.34573 3.03396 2.05857ZM2.36371 1.31643C3.37369 0.404274 4.75202 0 5.99995 0C8.07123 0 9.34539 1.11257 9.99996 1.77862C10.6545 1.11257 11.9287 0 14 0C15.2479 0 16.6262 0.404275 17.6362 1.31644C18.6674 2.24776 19.2668 3.66715 18.9949 5.5707C18.7233 7.47217 17.5149 9.31479 15.9294 11.0272C14.3355 12.7486 12.3064 14.3952 10.3 15.9C10.1222 16.0333 9.87773 16.0333 9.69995 15.9C7.69353 14.3952 5.66443 12.7485 4.0706 11.0272C2.48503 9.31478 1.27665 7.47217 1.00498 5.57072C0.733012 3.66716 1.33249 2.24776 2.36371 1.31643Z"/>\n' +
    '</svg>'

const trash = '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" onclick="deleteFromBucket(id)">\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M0.5 3C0.5 2.72386 0.723858 2.5 1 2.5H15C15.2761 2.5 15.5 2.72386 15.5 3C15.5 3.27614 15.2761 3.5 15 3.5H1C0.723858 3.5 0.5 3.27614 0.5 3Z"/>\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M1.4584 2.5H14.5059L13.6411 13.6926C13.5405 14.9947 12.4546 16 11.1486 16H4.84639C3.54299 16 2.45829 14.9986 2.35435 13.6994L1.4584 2.5ZM2.5416 3.5L3.35117 13.6196C3.41353 14.3992 4.06435 15 4.84639 15H11.1486C11.9322 15 12.5837 14.3968 12.6441 13.6155L13.4256 3.5H2.5416Z"/>\n' +
    '<path fill-rule="evenodd" clip-rule="evenodd" d="M11 3.5H5V1.46875C5 0.657582 5.65758 0 6.46875 0H9.53125C10.3424 0 11 0.657582 11 1.46875V3.5ZM6.46875 1C6.20987 1 6 1.20987 6 1.46875V2.5H10V1.46875C10 1.20987 9.79013 1 9.53125 1H6.46875Z"/>\n' +
    '</svg>'

function dropAvail() {
    document.getElementById("available-products-list").classList.toggle("hide");
    document.getElementById("dropbtn-avail").classList.toggle("close")
}

function dropNotAvail(){
    document.getElementById("missing-products-list").classList.toggle("hide");
    document.getElementById("dropbtn-miss").classList.toggle("close")
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
            addSizeAndColor(product)
            cartCount++;

        } else {
           // renderNotAvailable(product);
            missingCount++
        }
    });
    cartCountCircle(cartCount);
    //renderHead()
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
    let divPrice = document.getElementById(product.id);
    let div = document.createElement('div');
    ////////////////////////////////////////////////////////
    div.className = "product__panel-price";
    div.id = product.id+'-price'
    div.innerHTML = '<div class="product__panel-price__manage">' +
        '   <div class="count">' +
        '       <span id="'+product.id+'-minus" onmousedown="minus(id);" onmouseup="clearTimers()" onmouseout="clearTimers()" >−</span> <span>'+count+'</span> <span id="'+product.id+'-plus" onmousedown="plus(id) " onmouseup="clearTimers()" onmouseout="clearTimers()">+</span>' +
        '   </div>' +
        '   <div class="price__icons" id="'+product.id+'-price-icons">' +
        '       '+like+''+trash+''+
        '   </div>' +
        '</div>'+
        '<div class="price__block">' +
        '   <span id="'+product.id+'-sum" class="price__block-disprice">'+parseInt(discontprice).toLocaleString()+'</span><span class="price__block-curr"> сом</span><br class="mob">' +
        '   <div id="'+product.id+'-price-info" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">' +
        '       <span style="font-weight: 400; font-size: 13px">'+parseInt(price).toLocaleString()+'</span><span style="font-weight: 400; font-size: 13px"> сом</span>' +
        '   </div>' +
        '   <div class="info__content" id="'+product.id+'-price-info-content">' +
        '       <div class="discount"><span>Скидка '+product.discount+'%</span><span>-'+(product.price * (product.discount / 100)).toFixed(0)+' сом</span></div>' +
        // '       <div class="discount"><span>Скидка покупателя '+person.discount+'%</span><span>-'+(product.price * (person.discount / 100)).toFixed(0)+' сом</span></div>' +
        '   </div>' +
        '</div>';
    divPrice.append(div);
    if (count === product.countOnWarehouse){
        // document.getElementById(product.id+'-plus').style.color = 'rgba(0, 0, 0, 0.2)'
        // document.getElementById(product.id+'-plus').style.cursor = 'default'
    }
    if (count === 1){
        // document.getElementById(product.id+'-minus').style.color = 'rgba(0, 0, 0, 0.2)'
        // document.getElementById(product.id+'-minus').style.cursor = 'default'
    }
    quantCheck(product.countOnWarehouse, product.id);
    sizeCheck(product.id, discontprice);
    addLikeAndTrash(product.id);
}

///////потом
// function renderNotAvailable(product){
//     let div = document.createElement('div');
//     div.className = "product__panel";
//     div.id = product.id;
//     div.innerHTML = '<div class="product__panel-card">' +
//         '               <img src="'+ product.photo +'" alt="'+product.name+'">' +
//         '               <div class="product__panel-description">' +
//         '                   <h4>'+ product.name + '</h4>' +
//         '                   <div id="'+product.id+'-description" class="product__panel-description__add"></div>' +
//         '               </div>' +
//         '           </div>' +
//         '           <div class="notavailble-icons">' +
//         '               <div class="price__icons" id="'+product.id+'-price-icons">' +
//         '                   '+like+''+trash+'' +
//         '               </div>' +
//         '           </div>';
//     missingProducts.append(div);
//     addLikeAndTrash(product.id)
// }

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
        document.getElementById('notavail-list-head').innerHTML = first_word + '<span> • </span>' + missingCount + ' ' + second_word
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

function popupInfo(id){
    document.getElementById(id+'-content').classList.toggle("show");

}

function renderSeller(n){
    let arr = n.split(' ');
    let seller = "";
    const el = '"';
    if (arr[0] === "ООО"){
        for (let i=1; i<arr.length; i++){
            arr[i] = arr[i].toUpperCase();
        }
        arr.splice(1, 0, el);
        arr.push(el)
    }
    for (let i=0; i<arr.length; i++){
        if (arr[i] !== el && i < arr.length - 2){
            seller += arr[i] + " ";
        } else {
            seller += arr[i];
        }
    }
    return seller;
}

let timeout, interval;

function clearTimers(){
    clearTimeout(timeout);
    clearInterval(interval);
    getDeliveryProducts()
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
            calculate()
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
    getDeliveryProducts()
    calculate();
}

function plus(idPlus){
    let id = Number(idPlus.replace(/[^\d]/g, ''));
    let productPlus;
    let amount;
    products.forEach(product =>{
        if (product.id === id){
            productPlus = product;
            amount = product.amount;
        }
    });
    sumProducts.forEach(elem => {
        if (elem.id === id && elem.quantity !== amount){
            elem.quantity++
            let divPrice = document.getElementById(productPlus.id);
            let div = document.getElementById(productPlus.id+'-price');
            divPrice.removeChild(div);
            renderPrice(productPlus);
            calculate()
            timeout = setTimeout(()=>{
                interval = setInterval(()=>{
                    elem.quantity++
                    let divPrice = document.getElementById(productPlus.id);
                    let div = document.getElementById(productPlus.id + '-price');
                    divPrice.removeChild(div);
                    renderPrice(productPlus);
                    calculate()
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
    getDeliveryProducts()
    calculate();
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
    getDeliveryProducts()
    calculate();
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
        let span = document.createElement('span');
        span.innerHTML = 'Осталось '+ amount +' шт.'
        span.classList.add('count__amount');
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
    calculate()
}

function checkCheckbox(id){
    sumProducts.forEach(el => {
        if (el.id === id && el.checked){
            document.getElementById(id+'-check').checked = true
        }
    })
}

function addAllCheck(){
    let check = document.getElementById('take-all')
    sumProducts.forEach(elem =>{
        elem.checked = !!check.checked;
    })
    sumProducts.forEach(elem =>{
        let checkbox = document.getElementById(elem.id+'-check')
        checkbox.checked = !!check.checked;
    })
    getDeliveryProducts()
    calculate()
}

function verificationCheck(){
    let i = 0;
    let check = document.getElementById('take-all')
    sumProducts.forEach(elem =>{
        let checkbox = document.getElementById(elem.id+'-check')
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