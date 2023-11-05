let deliveryProducts = [];
let deliveryCost, destinationSum, firstDaySum;
var selectedValueAddress = personalData.pickupPoints[0];
var selectedValueAddressID;
var selectedValueCardID;
var selectedValueCard = personalData.cards[1];
let typesDelivery = ["pickUpPoint", "courier"]
let typeDelivery = typesDelivery[0];
let now = new Date();
let firstDay, lastDay;
let flagRenderOrder = false;
let namesMonth = [
    "января", "февраля", "марта", "апреля", "мая", "июня",
    "июля", "августа", "сентября", "октября", "ноября", "декабря"
]

function getDeliveryProducts() {
    deliveryProducts = []
    sumProducts.forEach(elem => {
        if (elem.checked) {

            deliveryProducts.push({
                id: elem.id,
                distance: returnDistance(elem.id),
                quantity: elem.quantity
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
    if(flagRenderOrder){
        firstDay='';
        lastDay='';
    }
    arr.forEach(el => {
        let date = now.addDays(el + 1);
        let dateDev = date.addDays(1);
        let dateString = getDate(date, dateDev);
        // Проверяем первое и последнее число с месяцем
        if (!firstDay || dateString > firstDay) {
            firstDay = dateString;
        }
        if (!lastDay || dateString < lastDay) {
            lastDay = dateString;
        }
        let block = document.createElement('div')
        block.className = "delivery-point";
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
    try {
        getTimeDeliveryTime();
    } catch (err) {

    }
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
            let stylesDisplay;
            if(el.quantity>1)stylesDisplay ='';
            else stylesDisplay = 'display: none';
            content += '<div class="product-delivery"><img src="' + img + '" alt="' + alt + '"><div style="'+stylesDisplay+'">' + el.quantity + '</div></div>';

        }
    })
    return content
}

function renderDelivery() {
    renderAddressList();
    let parent = document.getElementById('delivery-information');
    //renderDeliveryPoint(destination, type);
}
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
        let checkedAttribute = item.id === selectedValueAddress.id ? "checked" : "";
        let itemRadio = document.createElement('div');
        itemRadio.id = `${item.id}-block`
        itemRadio.className = 'custom-radio'
        itemRadio.innerHTML = `<input name="radio-address" type="radio" id=${item.id} value=${item.address} ${checkedAttribute}/>
                        <label for=${item.id} class="radio-address"></label>
                        <p><span>${item.address}</span><svg onclick="deleteAddress('${item.id}-block', 'pickUpPoint')" class="to_delete"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                                    </svg></p>`
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
        itemRadio.className = 'custom-radio';
        itemRadio.id = `${item.id}-block`;
        let checkedAttribute = item.id === selectedValueAddress.id ? "checked" : "";
        itemRadio.innerHTML = `
                        <input name="radio-address" type="radio" id=${item.id} value=${item.address} ${checkedAttribute}/>
                        <label for=${item.id} class="radio-address"></label>
                        <p><span>${item.address}</span><svg onclick="deleteAddress('${item.id}-block', 'courier')" class="to_delete"  xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black"/>
                                       <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black"/>
                                    </svg></p>`
        parent.append(itemRadio);
    });

    return parent;
}
function renderSelectAddressOrder() {
    let parent = document.getElementById('point-courier-order');
    if(parent){
        while (parent.firstChild) {
            parent.firstChild.remove();
        }
        let description;
        if(typeDelivery===typesDelivery[0]) description = 'Доставка в пункт выдачи';
        else description = 'Доставка курьером';
        parent.innerHTML = ` <div class="point-courier-order">
                    <section>
                        <h5>${description}</h5>
                        <img src="src/assets/icons/edit_pencil.svg">
                    </section>
                    <p>${selectedValueAddress.address}</p>
                    <span id="time-delivery-order"></span>
                </div>
                <div class="delivery-order-note">
                    <img src="src/assets/icons/price_shipping.svg"/>
                    <p class="description-note-delivery-order">Обратная доставка товаров на склад при отказе — <span>бесплатно</span></p>
                    <div class="popup-info-note-delivery-order"><p>Если товары вам не подойдут, мы вернем их обратно на склад — это бесплатно</p></div>
                </div>`;
    }
}

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