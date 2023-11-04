let deliveryProducts = [];
let deliveryCost, destinationSum, firstDaySum;
let firstElement = true;
var selectedValueAddress = personalData.pickupPoints[0];
var selectedValueAddressID;
var selectedValueCardID;
var selectedValueCard = personalData.cards[1];
let typesDelivery = ["pickUpPoint", "courier"]
let typeDelivery = typesDelivery[0];
let now = new Date();
let namesMonth = [
    "января", "февраля", "мара", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
]

function getDeliveryProducts() {
    deliveryProducts = []
    sumProducts.forEach(elem => {
        if (elem.checked) {

            deliveryProducts.push({
                id: elem.id,
                distance: returnDistance(elem.id),
                quant: elem.quant
            })
        }
    })
    renderDeliveryProducts();
    renderDeliveryPoint(personalData.pickupPoints[0], typeDelivery);
}

function returnDistance(id) {
    let n;
    products.forEach(elem => {
        if (elem.id === id) {
            n = elem.distance
        }
    })
    return n;
}

function clearDeliveryAddressBlock() {
    let parent = document.getElementById('delivery-information-1');
    while (parent.firstChild) {
        parent.firstChild.remove();
    }
}

function renderDeliveryPoint(destination, type) {
    clearDeliveryAddressBlock();
    let parent = document.getElementById('delivery-information-1')
    let deliveryPointBlock = document.createElement("div");
    deliveryPointBlock.className = "delivery-point";
    let deliveryCostBlock = document.createElement("div");
    deliveryCostBlock.className = "delivery-point";
    if (type === typesDelivery[1]) {
        destinationSum = destination;
        if (personalData["deliveryCost"] === 'free') {
            deliveryCost = 'Бесплатно'
        }
        deliveryPointBlock.innerHTML = `<h5 id="type-delivery-point">Адрес доставки</h5>
                            <section class="pickup-point">
                                <p>${destination.address}</p>
                            </section>`
        deliveryCostBlock.innerHTML = `<h5>Стоимость доставки</h5>
                            <section>
                                <p>${deliveryCost}</p>
                            </section>`

    } else if (type === typesDelivery[0]) {
        deliveryPointBlock.innerHTML = `<h5 id="type-delivery-point">Пункт выдачи</h5>
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
}

function getDate(firstDate, secondDate) {
    let content;
    let firstMonth = namesMonth[firstDate.getMonth()];
    let firstDay = firstDate.getUTCDate();
    let secondMonth = namesMonth[secondDate.getMonth()];
    let secondDay = secondDate.getUTCDate();
    if (firstMonth === secondMonth) {
        content = firstDay + '—' + secondDay + ' ' + firstMonth
    } else {
        content = firstDay + ' ' + firstMonth + ' -<br>' + secondDay + ' ' + secondMonth
    }
    return content
}

Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function removeDeliveryProducts() {
    let deliveryInformation = document.getElementById('delivery-information-2');
    while (deliveryInformation.firstChild) {
        deliveryInformation.firstChild.remove();
    }
    renderDeliveryPoint(selectedValueAddress,typeDelivery);
}

function renderDeliveryProducts() {
    removeDeliveryProducts();
    let array = []
    deliveryProducts.forEach(elem => {
        array.push(elem.distance)
    })
    let arr = new Set(array);
    arr.forEach(el => {
        let block = document.createElement('div')
        block.className = "delivery-point";
        let date = now.addDays(el + 1)
        let dateDev = date.addDays(1)
        block.innerHTML = ` <h5>${getDate(date, dateDev)}</h5>
                            <section class="delivery-date-images">
                            ${getProducts(el)}
                            </section>`
        firstDaySum = getDate(date, dateDev);
        document.getElementById('delivery-information-2').append(block);
    })
    let note = document.createElement("div");
    note.id = 'delivery-note-1'
    note.className = "delivery-note";
    note.innerHTML = `<img src="src/assets/icons/price_shipping.svg"/>
                            <p class="description-note-delivery">Обратная доставка товаров на склад при отказе — <span>бесплатно</span></p>
                       <div class="popup-info-note-delivery"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>`
    document.getElementById('delivery-information-2').append(note);
}

function getProducts(n) {
    let content = '';
    deliveryProducts.forEach(el => {
        if (el.distance === n) {
            let img;
            let alt;
            products.forEach(elem => {
                if (el.id === elem.id) {
                    img = elem.image
                    alt = elem.name
                }
            })
            content += '<div class="product-delivery"><img src="' + img + '" alt="' + alt + '"><div>' + el.quant + '</div></div>';
        }
    })
    return content
}

function renderDelivery() {
    renderAddressList();
    let parent = document.getElementById('delivery-information');
    //renderDeliveryPoint(destination, type);

}

function renderSubscription() {
    let sub = document.getElementById('delivery__subscription');
    sub.innerHTML = '<img src="img/price%20shipping.svg" alt="галочка"><div style="display: inline-block; margin-left: 2px"> Обратная доставка товаров на склад при отказе — <span id="free" onmouseover="popupInfo(id)" onmouseout="popupInfo(id)">бесплатно</span></div>' +
        '<div class="info__content" id="free-content" style="width: 290px; left: 260px"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>'
}

// function renderPPointsList(){
//     //deleteButton()
//     type = 'pickup-point';
//     let modul = document.getElementById('popUpDelivery')
//     modul.children[1].children[0].style.border = '2px solid #CB11AB';
//     modul.children[1].children[1].style.border = '2px solid rgba(203, 17, 171, 0.15)';
//     let PVZ = document.createElement('form')
//     PVZ.classList = 'popup-window-addresses'
//     PVZ.id = 'PVZ'
//     getPPointsList(PVZ);
//     modul.append(PVZ)
//     for (let i = 0; i < person.PVZ.length; i++){
//         addTrashDel(i, type);
//     }
//     if (firstElement){
//         document.getElementById('radio-0').checked = true;
//         firstElement = false;
//     }
//     renderButton()
// }

// function getPPointsList(block){
//     let i = 0;
//     person.PVZ.forEach( elem => {
//         let input = document.createElement('input');
//         input.type = 'radio';
//         input.id = 'radio-'+i;
//         input.name = 'pickup-point-check'
//         let label = document.createElement('label');
//         label.setAttribute('for', `radio-`+i);
//         label.innerHTML = elem.address + '<br>' + ratingIcon + '<span> '+elem.grade+'</span> <span style="color: #A0A0A4">'+elem.working_hours+'</span>'
//         let div = document.createElement('div');
//         div.classList = 'address-list'
//         div.innerHTML = '<div class="form_radio">' + input.outerHTML + label.outerHTML+ '</div><div class="address-list-trash">' + trash + '</div>';
//         block.append(div)
//         i++
//     })
// }

function renderAddressList() {
    console.log(typeDelivery)
    let block;
    let container = document.getElementById('choosing-delivery-method');
    if (typeDelivery === typesDelivery[0]) {
        container.children[0].style = 'border: 2px solid #CB11AB';
        container.children[1].style = 'border: 2px solid rgba(203, 17, 171, 0.15)';
        removeRadioGroup();
        block = getAddressPickUpPointList();
    } else if (typeDelivery === typesDelivery[1]) {
        container.children[1].style = 'border: 2px solid #CB11AB';
        container.children[0].style = ' border: 2px solid rgba(203, 17, 171, 0.15)';
        removeRadioGroup();
        block = getAddressList();
    }
    let title = document.createElement('h4');
    title.textContent = `Мои адреса`
    block.prepend(title)
    let parent = document.getElementById('choosing-address-container');
    parent.append(block);
}

function removeRadioGroup() {
    let radioGroup = document.getElementById('address-modal');
    if (radioGroup) {
        radioGroup.remove();
    }
}

function changeDeliveryTypePP() {
    if (typeDelivery !== typesDelivery[0]) {
        typeDelivery = typesDelivery[0];
        removeRadioGroup();
        renderAddressList();
    }
}

function changeDeliveryTypeC() {
    if (typeDelivery !== typesDelivery[1]) {
        typeDelivery = typesDelivery[1];
        removeRadioGroup();
        renderAddressList();
    }
}

function getAddressPickUpPointList() {
    removeRadioGroup();
    let parent = document.createElement('div');
    parent.className = 'radio-group';
    parent.id = 'address-modal';
    personalData.pickupPoints.forEach(item => {
        let itemRadio = document.createElement('div');
        itemRadio.className = 'custom-radio'
        itemRadio.innerHTML = `<input name="radio-address" type="radio" id=${item.id} value=${item.address}/>
                        <label for=${item.id} class="radio-address"></label>
                        <p><span>${item.address}</span><img src="src/assets/icons/delet.svg"></p>`
        parent.append(itemRadio);
    });

    return parent;
}

function getAddressList() {
    removeRadioGroup();
    let parent = document.createElement('div');
    parent.className = 'radio-group';
    parent.id = 'address-modal';
    personalData.addresses.forEach(item => {
        let itemRadio = document.createElement('div');
        itemRadio.className = 'custom-radio'
        itemRadio.innerHTML = `
                        <input name="radio-address" type="radio" id=${item.id} value=${item.address}/>
                        <label for=${item.id} class="radio-address"></label>
                        <p><span>${item.address}</span><img src="src/assets/icons/delet.svg"></p>`
        parent.append(itemRadio);
    });

    return parent;
}

// function takeAddressFromModal(){
//     var radioButtons = document.getElementsByName("radio-address");
//     for (var i = 0; i < radioButtons.length; i++) {
//         if (radioButtons[i].checked) {
//             selectedValue = radioButtons[i].id;
//             break;
//         }
//     }
//     for ( let i = 0; i < radioButtons.childElementCount; i++){
//         let arrCheck = radioButtons.children[i].firstElementChild.firstElementChild;
//         if (arrCheck.checked){
//             if (typeDelivery === typesDelivery[1]){
//                 renderDelivery(personalData.addresses[i]);
//             }
//             if (typeDelivery === typesDelivery[0]){
//                 renderDelivery(personalData.pickupPoints[i])
//             }
//         }
//     }
//     return selectedValue;
//     // renderDeliverySum()
// }

function renderCards() {
    let container = document.getElementById('choosing-bank-cards-container');
    let parent = document.createElement('div');
    parent.className = 'radio-group';
    parent.id = 'address-modal';
    personalData.cards.forEach(item => {
        img = item.type
        let itemRadio = document.createElement('div');
        itemRadio.className = 'custom-radio';
        let checkedAttribute = item.id === selectedValueCard.id ? "checked" : "";
        itemRadio.innerHTML = `
                              <input name="bank_card" type="radio" id=${item.id} ${checkedAttribute}>
                              <label for=${item.id}></label>
                              <p><img src=${img}><span>${item.number}</span></p>`
        parent.append(itemRadio);
    });
    console.log(container)
    container.append(parent);
}

function renderSelectCard() {
    console.log(selectedValueCard)
    let parent1 = document.getElementById('select-card-order');
    let parent2 = document.getElementById('select-bank-card');
    if(parent1){
        while (parent1.firstChild) {
            parent1.firstChild.remove();
        }
    }
    if(parent2){
        while (parent2.firstChild) {
            parent2.firstChild.remove();
        }
    }

    let block1 = document.createElement('div');
    block1.innerHTML = `<img src=${selectedValueCard.type}>
                        <p>${selectedValueCard.number}</p>`
    let block2 = document.createElement('div');
    block2.className = 'bank-card';

    block2.innerHTML = `<img src=${selectedValueCard.type}>
                        <p><span>${selectedValueCard.number}</span><span>${selectedValueCard.expirationDate}</span></p>`
    if(parent1) parent1.append(block1);
    if(parent2) parent2.append(block2);
}

renderDeliveryProducts();
renderSelectCard();