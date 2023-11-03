let deliveryProducts = [];
let deliveryCost, destinationSum, firstDaySum;
let firstElement = true;
let defaultAddress = personalData.pickupPoints[0];
let typeDelivery;
let now = new Date();
let namesMonth = [
    "января", "февраля", "мара", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
]
function getDeliveryProducts(){
    deliveryProducts = []
    console.log(sumProducts)
    sumProducts.forEach(elem =>{
        if (elem.checked){

            deliveryProducts.push({
                id: elem.id,
                distance: returnDistance(elem.id),
                quant: elem.quant
            })
        }
    })
    renderDeliveryPoint(personalData.pickupPoints[0],'pickup-point');
}
function returnDistance(id){
    let n;
    products.forEach(elem =>{
        if (elem.id === id){
            n = elem.distance
        }
    })
    return n;
}
function clearDelivery(){
    let parent = document.getElementById('delivery-information');
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}
function renderDeliveryPoint(destination, type){
    clearDelivery();
    let parent = document.getElementById('delivery-information')
    let deliveryPointBlock = document.createElement("div");
    deliveryPointBlock.className = "delivery-point";
    let deliveryCostBlock= document.createElement("div");
    deliveryCostBlock.className = "delivery-point";
    if(type==='courier'){
        destinationSum = destination;
        if (personalData["deliveryCost"] === 'free'){
            deliveryCost = 'Бесплатно'
            //renderSubscription();
        }
        deliveryPointBlock.innerHTML =`<h5 id="type-delivery-point">Адрес доставки</h5>
                            <section class="pickup-point">
                                <p>${destination.address}</p>
                            </section>`
        deliveryCostBlock.innerHTML = `<h5>Стоимость доставки</h5>
                            <section>
                                <p>${deliveryCost}</p>
                            </section>`

    }else if(type==='pickup-point'){
        deliveryPointBlock.innerHTML =`<h5 id="type-delivery-point">Пункт выдачи</h5>
                            <section class="pickup-point">
                                <p>${destination.address}</p>
                                <div class="pickup-point-info">
                                    <span><img src="src/assets/icons/star_fill.svg"/>${destination.rating}</span>
                                    <span>${destination.workingHours}</span>
                                </div>
                            </section>`
        deliveryCostBlock.innerHTML = `<h5>Стоимость доставки</h5>
                            <section>
                                <p>Бесплатно</p>
                            </section>`
    }
    parent.prepend(deliveryCostBlock);
    parent.prepend(deliveryPointBlock);
    renderDeliveryProducts();
}
function renderDeliveryNote(){
    let parent = document.getElementById('delivery-information');

    // note.innerHTML = '<img src="img/price%20shipping.svg" alt="галочка"><div style="display: inline-block; margin-left: 2px"> Обратная доставка товаров на склад при отказе — <span id="free" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">бесплатно</span></div>' +
    //     '<div class="info__content" id="free-content" style="width: 290px; left: 260px"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>'
}


function getDate(firstDate, secondDate){
    let content;
    let firstMonth = namesMonth[firstDate.getMonth()];
    let firstDay = firstDate.getUTCDate();
    let secondMonth = namesMonth[secondDate.getMonth()];
    let secondDay = secondDate.getUTCDate();
    if (firstMonth === secondMonth){
        content = firstDay + '—' + secondDay + ' ' + firstMonth
    } else {
        content = firstDay + ' ' + firstMonth + ' -<br>' + secondDay + ' ' + secondMonth
    }
    return content
}
Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function renderDeliveryProducts(){
   // clearDelivery()
    let array = []
    deliveryProducts.forEach(elem =>{
        array.push(elem.distance)
    })
    let arr = new Set(array);
    arr.forEach(el =>{
        let block = document.createElement('div')
        block.className= "delivery-point";
        let date = now.addDays(el+1)
        let dateDev = date.addDays(1)
        block.innerHTML = ` <h5>${getDate(date, dateDev)}</h5>
                            <section class="delivery-date-images">
                            ${getProducts(el)}
                            </section>`
        firstDaySum = getDate(date, dateDev);
        document.getElementById('delivery-information').append(block);
    })
    let note = document.createElement("div");
    note.className = "delivery-note";
    note.innerHTML = `<img src="src/assets/icons/price_shipping.svg"/>
                            <p class="description-note-delivery">Обратная доставка товаров на склад при отказе — <span>бесплатно</span></p>
                       <div class="popup-info-note-delivery"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>`
    document.getElementById('delivery-information').append(note);

}

function getProducts(n){
    let content = '';
    deliveryProducts.forEach(el =>{
        if (el.distance === n){
            let img;
            let alt;
            products.forEach(elem =>{
                if (el.id === elem.id){
                    img = elem.image
                    alt = elem.name
                }
            })
            content += '<div class="product-delivery"><img src="' + img + '" alt="' + alt + '"><div>'+ el.quant +'</div></div>';
        }
    })
    return content
}
function renderDelivery(destination){
    let parent = document.getElementById('delivery-information');

    //renderDeliveryPoint(destination, type);

}
// function renderDelivery(destination){
//     let deliveryInfo = document.getElementById('delivery-method-container')
//     let deliveryPoint = document.getElementById('type-delivery-point')
//     if (type === 'courier'){
//         //delivery-point
//         deliveryPoint.innerHTML="Адрес доставки"
//         deliveryInfo.firstElementChild.firstElementChild.lastElementChild.innerHTML = destination;
//         destinationSum = destination
//     }
//     if (type === 'pickup-point'){
//         deliveryInfo.firstElementChild.firstElementChild.firstElementChild.innerHTML = 'Пункт выдачи'
//         deliveryInfo.firstElementChild.firstElementChild.lastElementChild.innerHTML = destination.address + '<br>' + ratingIcon + '<span> '+destination.grade+'</span> <span class="work_hours">'+destination.working_hours+'</span>'
//         destinationSum = destination.address
//     }
//     if (personalData["deliveryCost"] === 'free'){
//         deliveryInfo.children[0].children[1].children[1].innerHTML = 'Бесплатно';
//         deliveryCost = 'Бесплатно'
//         renderSubscription();
//     }
// }
function renderSubscription(){
    let sub = document.getElementById('delivery__subscription');
    sub.innerHTML = '<img src="img/price%20shipping.svg" alt="галочка"><div style="display: inline-block; margin-left: 2px"> Обратная доставка товаров на склад при отказе — <span id="free" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">бесплатно</span></div>' +
        '<div class="info__content" id="free-content" style="width: 290px; left: 260px"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>'
}

function renderPPointsList(){
    //deleteButton()
    type = 'pickup-point';
    let modul = document.getElementById('popUpDelivery')
    modul.children[1].children[0].style.border = '2px solid #CB11AB';
    modul.children[1].children[1].style.border = '2px solid rgba(203, 17, 171, 0.15)';
    let PVZ = document.createElement('form')
    PVZ.classList = 'popup-window-addresses'
    PVZ.id = 'PVZ'
    getPPointsList(PVZ);
    modul.append(PVZ)
    for (let i = 0; i < person.PVZ.length; i++){
        addTrashDel(i, type);
    }
    if (firstElement){
        document.getElementById('radio-0').checked = true;
        firstElement = false;
    }
    renderButton()
}

function getPPointsList(block){
    let i = 0;
    person.PVZ.forEach( elem => {
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = 'radio-'+i;
        input.name = 'pickup-point-check'
        let label = document.createElement('label');
        label.setAttribute('for', `radio-`+i);
        label.innerHTML = elem.address + '<br>' + ratingIcon + '<span> '+elem.grade+'</span> <span style="color: #A0A0A4">'+elem.working_hours+'</span>'
        let div = document.createElement('div');
        div.classList = 'address-list'
        div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML+ '</div><div class="address-list-trash">' + trash + '</div>';
        block.append(div)
        i++
    })
}

function renderAddressList(){
   // deleteButton()
    type = 'courier'
    let modul = document.getElementById('popUpDelivery')
    modul.children[1].children[1].style.border = '2px solid #CB11AB';
    modul.children[1].children[0].style.border = '2px solid rgba(203, 17, 171, 0.15)';
    let address = document.createElement('form')
    address.classList = 'popup-window-addresses'
    address.id = 'address'
    getAddressList(address);
    modul.append(address)
    for (let i = 0; i < person.addresses.length; i++){
        addTrashDel(i, type);
    }
    if (firstElement){
        document.getElementById('radio-0').checked = true;
        firstElement = false;
    }
    //renderButton()
}

function  getAddressList(block){
    let i = 0;
    personalData.addresses.forEach( item => {
        let input = document.createElement('input');
        input.type = 'radio';
        input.id = 'radio-'+i;
        input.name = 'addressCheck'
        let label = document.createElement('label');
        label.setAttribute('for', `radio-`+i);
        label.innerHTML = item
        let div = document.createElement('div');
        div.classList = 'address-list'
        div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML+ '</div><div class="address-list-trash">' + trash + '</div>';
        block.append(div)
        i++
    })
}

function takeAddressFromModal(){
    var radioButtons = document.getElementsByName("radio-address");
    var selectedValue = "";

    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedValue = radioButtons[i].value;
            break;
        }
    }

    for ( let i = 0; i < arr.childElementCount; i++){
        let arrCheck = arr.children[i].firstElementChild.firstElementChild;
        if (arrCheck.checked){
            if (type === 'courier'){
                renderDelivery(personalData.addresses[i])
            }
            if (type === 'PVZ'){
                renderDelivery(personalData.pickupPoints[i])
            }
        }
    }
    // closeBlock('popUpDelivery')
    // renderDeliverySum()
}
renderDelivery(defaultAddress);